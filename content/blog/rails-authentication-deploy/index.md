---
title: Really simple Rails API authentication
date: '2019-12-19T22:12:03.284Z'
description: Write & deploy a Rails app in no time at all
---

rails new authentication-boilerplate --api
bundle
rails g scaffold User email:uniq password:digest
$ rails db:migrate

GET http://localhost:3000/users
POST http://localhost:3000/users with 
{
  "user": {
    "email": "test@test.ca",
    "password": "1234"
  }
}

GET http://localhost:3000/users

JWT stuff

GET http://localhost:3000/users

{
    "error": "Invalid Request"
} 




https://www.sitepoint.com/authenticate-your-rails-api-with-jwt-from-scratch/
https://medium.com/@wintermeyer/authentication-from-scratch-with-rails-5-2-92d8676f6836