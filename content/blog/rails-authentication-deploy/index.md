---
title: Creating & deploying a Rails API with authentication
date: '2019-12-23T22:12:03.284Z'
description: Write & deploy a Rails app in no time at all
---

![](./banner.jpg)
Photo by [CMDR Shane](https://unsplash.com/@cmdrshane)

In this quick & dirty tutorial, we make a Rails API with endpoints for authentication, using JSON Web Tokens (JWT). Then, we deploy it to Heroku.

This tutorial is for you if you want to create a back-end for a web/mobile app, and also want to get past the boring authentication boilerplate.

Let's dive in!

**Note that I am using Rails 6.0.2.1 and Ruby 2.4.4 for this tutorial.**

## Creating our API and User model

To start, we'll run the `rails new` command with the `--api` option, which skips creating front-end views & such.

```ruby
rails new authentication-boilerplate --api
```

Then, we can create a `scaffold` for our User model. `rails generate scaffold` is similar to `rails generate model`, except it also includes a controller for us. Handy.

```
rails g scaffold User email:uniq password:digest
```

We want a unique email field and a password digest. Then, we update the database.

```
rails db:migrate
```

## Bcrypt

We're going to be using the gem `bcrypt` to help us with password encryption. In our Gemfile, we can add the following line:

```ruby
gem 'bcrypt'
```

Then run `bundle` from the command line to install our gems.

Open up `app/models/user.rb`, and add the following validation hook:

```ruby
class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
end
```

You can [read more about this method and what it does here](https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password).

## Endpoints

Now that we have our basic API + model, let's talk about our goals.
We want to support the following endpoints:
1. Get a list of existing users (GET `/users`)
2. Create a user (POST `/users`)
3. Log in with an existing user email + password (POST `/users/login`)

The first two endpoints were already created for us by generating the `User` scaffold. All we need to do is take care of logging in.

So what happens when we log a user in? Here's the process.

1. The front-end sends the email and password (POST `/users/login`)
2. We authenticate the email/password and, if successful, create a JSON Web Token and send it back.
3. The front-end uses that token on every subsequent request to let us know it's a valid user.

To test that this works, we're going to only allow calls to GET `/users` if the request includes a valid token. So you can ONLY see the list of existing if you're logged in.

## JSON Web Tokens

JWTs are hash strings that encode some useful information, such as the user in question and the expiry date of the token. This means that we can create unique tokens that only last a certain amount of time. Once they expire, the user must re-login to get a new token.

There's a handy gem `jwt` to handle this. Add `gem 'jwt'` to your `Gemfile` then run `bundle` again.

Now we want to create a utility to help us create and manage JWTs. In your application's `lib/` directory, create a file called `json_web_token.rb`. Here's the full file, which explanatory comments.

```ruby
require 'jwt'

class JsonWebToken
  # Encodes and signs the payload (e.g. the user email) using our app's secret key
  # The result also includes the expiration date.
  def self.encode(payload)
    payload.reverse_merge!(meta)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  # Decode the JWT to get the user email
  def self.decode(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base)
  end

  # Validates the payload hash for expiration and meta claims
  def self.valid_payload(payload)
    if expired(payload) || payload['iss'] != meta[:iss] || payload['aud'] != meta[:aud]
      return false
    else
      return true
    end
  end

  # Default options to be encoded in the token
  def self.meta
    {
      exp: 7.days.from_now.to_i,
      iss: 'issuer_name',
      aud: 'client',
    }
  end

  # Validates if the token is expired by exp parameter
  def self.expired(payload)
    Time.at(payload['exp']) < Time.now
  end
end 
```

(The above file comes from an article by [Vinoth](https://www.sitepoint.com/author/avinoth/), which you can find [here](https://www.sitepoint.com/authenticate-your-rails-api-with-jwt-from-scratch/))

## Application controller

In a real application, most of our endpoints would be protected, requiring token authorization to access. We'd want to authenticate most requests. Let's create a helper for doing so.

Update your `app/controllers/application_controller.rb` to look like so:
```ruby
class ApplicationController < ActionController::API
  require 'json_web_token'

  protected
  # Validates the token and user and sets the @current_user scope
  def authenticate_request!
    if !payload || !JsonWebToken.valid_payload(payload.first)
      return invalid_authentication
    end

    load_current_user!
    invalid_authentication unless @current_user
  end

  # Returns 401 response. To handle malformed / invalid requests.
  def invalid_authentication
    render json: {error: 'Invalid Request'}, status: :unauthorized
  end

  private
  # Deconstructs the Authorization header and decodes the JWT token.
  def payload
    auth_header = request.headers['Authorization']
    token = auth_header.split(' ').last
    JsonWebToken.decode(token)
  rescue
    nil
  end

  # Sets the @current_user with the user_id from payload
  def load_current_user!
    @current_user = User.find_by(id: payload[0]['user_id'])
  end
end
```

(Code & comments courtesy of [Vinoth](https://www.sitepoint.com/authenticate-your-rails-api-with-jwt-from-scratch/).)

We can now use the `authenticate_request!` helper for our routes. Let's do so by modifying `app/controllers/users_controller.rb`.

```ruby
class UsersController < ApplicationController
  before_action :authenticate_request!, except: :create

  # ... rest of file

```

Now, most routes will require a valid JWT for access, except for signup.

## Logging in

Let's make a route for existing users to log in. Add it to your `UsersController` like so:

```ruby
class UsersController < ApplicationController
  before_action :authenticate_request!, except: [:create, :login] # Exclude this route from authentication
  before_action :set_user, only: [:show, :update, :destroy]

  def login
    user = User.find_by(email: user_params[:email].to_s.downcase)

    if user && user.authenticate(user_params[:password])
        auth_token = JsonWebToken.encode({user_id: user.id})
        render json: {auth_token: auth_token}, status: :ok
    else
      render json: { error: 'Invalid username / password' }, status: :unauthorized
    end
  end

  # ... rest of file
```

We take the email and password from the request parameters and use it to authenticate the user (the `authenticate` method comes from that `has_secure_password` helper on the `User` model, courtesy of the `bcrypt` gem).
If the authentication succeeds, we send back a token.

Let's add this route to our `config/routes.rb` file:

```ruby
Rails.application.routes.draw do
  resources :users do
    collection do
      post 'login'
    end
  end
end
```

## Testing our progress

You can test out our endpoints locally by downloading [Postman](https://www.getpostman.com/) for free. Run your app with `rails s` and then send a GET request to `http://localhost:3000/users`. You should receive an error like so, since we're not logged in:

```javascript
{
    "error": "Invalid Request"
} 
```

To create a user, send a POST to `http://localhost:3000/users` with a `raw` body of:
```javascript
{
  "user": {
    "email": "test@test.ca",
    "password": "1234"
  }
}
```

Then, you can log in by sending another POST to `http://localhost:3000/users/login` with the same body. You should get back an authentication token.

Add that authentication token as the Authorization header, and then try again to GET `/users`. This time, it should succeed. Nice!

## Deployment

To deploy our API to Heroku, we need to do a little housecleaning. First, we need to convert our app to Postgres, since that is the database that Heroku uses by default.

Add `gem 'pg`' to your `Gemfile` and run `bundle`. Then, open up `config/database.yml` and replace its contents with the following (which comes straight from the Heroku docs):

```ruby
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: myapp_development

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
  database: myapp_production
  username: myapp
  password: <%= ENV['MYAPP_DATABASE_PASSWORD'] %>
```

Lastly, we need to ensure `Rails.application.secrets.secret_key_base` is available and working in our production API, since we use it to create tokens. Add the following in your `config/secrets.yml`:

```ruby
# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
```

Heroku will automatically populate this value. From here, we're ready to deploy!

First, we need to push our code up to Git. If you're unsure how to do this, see [this guide](https://devcenter.heroku.com/articles/getting-started-with-rails6#store-your-app-in-git).

Install the [Heroku Command Line Interface](https://devcenter.heroku.com/articles/heroku-cli) and then run the following from your project directory:
```
heroku create
```

This command should give you a URL, something like `https://pacific-tundra-73303.herokuapp.com/`. This is the URL for your API.

Then run the following commands in sequence:

```
git push heroku master
heroku run rake db:migrate
heroku ps:scale web=1
```

These commands push our code up to Heroku, update the database, and then spin up a dyno to process requests.

## Testing our Heroku API

To test the API, run the same Postman requests as before, but substitute your Heroku URL for `localhost`. You should be able to run through the same flow (creating a user, signing in, fetching the list of users) as before.

If all works, then you're done! You have a working API with authentication support! Now, all you need is a front-end... but more on that to come. Subscribe below if you want to learn how to hook this API up to a mobile app.

## Sources

https://www.sitepoint.com/authenticate-your-rails-api-with-jwt-from-scratch/

https://medium.com/@wintermeyer/authentication-from-scratch-with-rails-5-2-92d8676f6836