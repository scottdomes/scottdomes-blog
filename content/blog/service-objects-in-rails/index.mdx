---
title: Service objects in Rails
date: "2019-08-19T22:12:03.284Z"
description: The path to slimmer controllers and models
---

![Photo by [Patrick Schneider](https://unsplash.com/photos/LQ3LmOV6T8M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/cart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](./banner.jpeg)*Photo by [Patrick Schneider](https://unsplash.com/photos/LQ3LmOV6T8M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/cart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

Imagine you have a controller with some complex business logic.

```ruby
class UserController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      send_welcome_email
      notify_slack
      if @user.admin?
        log_new_admin
      else
        log_new_user
      end
      redirect_to new_user_welcome_path
    else
      render 'new'
    end
  end

  # private methods
end
```

This code isn’t unreadable, but there’s a lot going on. The controller has too much to deal with—it needs private methods to cover everything from sending a welcome email to notifying slack to logging whether it’s an admin or user.

Clearly, if we want skinny controllers, the above approach isn’t the best.

We *could* extract all of the above into methods on the User model. Over time, though, we may find our model gets extremely cluttered. Want to read a 500 line model? Me neither.

A better solution? Service objects.

## What are service objects?

Service objects are plain old Ruby objects (PORO’s) that do *one thing.*

They encapsulate a set of business logic, moving it out of models and controllers and into a more focused setting.

Here’s what a RegisterUser service object might look like:

```ruby
class RegisterUser
  def initialize(user)
    [@user](http://twitter.com/user) = user
  end

  def execute
    return nil unless [@user](http://twitter.com/user).save
    send_welcome_email
    notify_slack
    if @user.admin?
      log_new_admin
    else
      log_new_user
    end
    [@user](http://twitter.com/user)
  end

  # private methods
end
```

Our service object takes a newly instantiated user on initialize, and will either return a saved version of that user, or nil if there were problems saving.

And our slim controller:

```ruby
class UserController < ApplicationController
  def create
    user = RegisterUser.new(User.new(user_params)).execute
    if user
      redirect_to new_user_welcome_path
    else
      render 'new'
    end
  end

  # private methods
end
```

We still have an if statement in our controller, but now it’s solely concerned with rendering and redirecting—normal controller concerns.

[Dave Copeland](https://multithreaded.stitchfix.com/blog/2015/06/02/anatomy-of-service-objects-in-rails/) on service objects:
> Where a classic Rails design would add Yet Another Method™ to the nearest ActiveRecord object, using service objects allows us to keep all of our code separate and organized. This makes it easy to understand, modify, and test our business logic.

## Returning values

The above code is a start, but it isn’t very useful if our user doesn’t save. We have no information on why saving failed.

Rather than returning either User or nil, we could return a *result object.*

A result object should tell us if the service was successful. If yes, it should contain any necessary return values. If no, it should give us errors.

You could write this as an OpenStruct:

```ruby
class RegisterUser
  def initialize(user)
    [@user](http://twitter.com/user) = user
  end

  def execute
    return OpenStruct.new(success?: false, user: nil, errors: [@user](http://twitter.com/user).errors) unless [@user](http://twitter.com/user).save
    send_welcome_email
    notify_slack
    if @user.admin?
      log_new_admin
    else
      log_new_user
    end
    OpenStruct.new(success?: true, user: [@user](http://twitter.com/user), errors: nil)
  end

  # private methods
end
```

And in our controller:

```ruby
class UserController < ApplicationController
  def create
    result = RegisterUser.new(User.new(user_params)).execute
    if result.success?
      redirect_to new_user_welcome_path
    else
      render 'new', error: result.errors
    end
  end

  # private methods
end
```

If we need the user itself, we could still access it via result.user. But the OpenStruct gives us all the information we need about what happened within the service.

You could also create a Result class instead of using OpenStruct.

## Syntactic sugar

If you find the ServiceObject.new(arguments).execute chain to be ugly, you can simplify it like so:

```ruby
class RegisterUser
  def self.call(*args, &block)
    new(*args, &block).execute
  end

  def initialize(user)
    [@user](http://twitter.com/user) = user
  end

  def execute
    # old code
  end

  # private methods
end
```

The self.call method means we can create a new RegisterUser object and invoke execute simply by calling RegisterUser.call(user_arguments).

Here’s it in practice:
```ruby
class UserController < ApplicationController
  def create
    result = RegisterUser.call(User.new(user_params))
    if result.success?
      redirect_to new_user_welcome_path
    else
      render 'new', error: result.errors
    end
  end

  # private methods
end
```

Nothing too crazy, but a little cleaner.

## Calling dependent services

Let’s say our notify_slack method got out of hand, and we decided to expand *that* to its own service object.

Here’s what it might look like:

```ruby
class RegisterUser
  def initialize(user)
    [@user](http://twitter.com/user) = user
  end

def execute
    return OpenStruct.new(success?: false, user: nil, errors: [@user](http://twitter.com/user).errors) unless [@user](http://twitter.com/user).save
    send_welcome_email
    NotifySlack.call(@user)
    if @user.admin?
      log_new_admin
    else
      log_new_user
    end
    OpenStruct.new(success?: true, user: [@user](http://twitter.com/user), errors: nil)
  end

# private methods
end
```

Seems fine, but as [Dave Copeland](https://multithreaded.stitchfix.com/blog/2015/06/02/anatomy-of-service-objects-in-rails/) notes, the RegisterUser service now knows how to both create and invoke the NotifySlack service.

As he writes:
> This means that if we need to change how [the child service] is created, we have to change [the parent method] \(and likely its tests).

His solution? Extract the creation of the child service object to a private method:

```ruby
class RegisterUser
  def initialize(user)
    [@user](http://twitter.com/user) = user
  end

  def execute
    return OpenStruct.new(success?: false, user: nil, errors: [@user](http://twitter.com/user).errors) unless [@user](http://twitter.com/user).save
    send_welcome_email
    notify_slack_service.execute
    if @user.admin?
      log_new_admin
    else
      log_new_user
    end
    OpenStruct.new(success?: true, user: [@user](http://twitter.com/user), errors: nil)
  end

  private

  def notify_slack_service
    [@notify_slack_service](http://twitter.com/notify_slack_service) ||= NotifySlack.new([@user](http://twitter.com/user))
  end

  # private methods
end
```

Note that this doesn’t work with our fancy call business above.

## What should be a service object?

Service objects are great for encapsulating complex objects. But that doesn’t mean *all* heavy-duty logic requires a service object.

A bad approach would be to simply move a 500 line model straight into a service object.

A good service object is easy to test and follows the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).

Here’s what [Amin Shah Gilani](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial) says:
> Does your code handle routing, params or do other controller-y things?
If so, don’t use a service object — your code belongs in the controller.
> Are you trying to share your code in different controllers?
In this case, don’t use a service object — use a concern.
> Is your code like a model that doesn’t need persistence?
If so, don’t use a service object. Use a non-ActiveRecord model instead.
> Is your code a specific business action? (e.g., “Take out the trash,” “Generate a PDF using this text,” or “Calculate the customs duty using these complicated rules”)
In this case, use a service object. That code probably doesn’t logically fit in either your controller or your model.

A specific business action that does one thing. That’s our goal with service objects. If you can meet that definition, they can be a great way to separate logic into testable & digestible pieces.

Thanks for reading!
