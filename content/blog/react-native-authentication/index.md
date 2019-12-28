---
title: Simple React Native authentication
date: "2019-08-19T22:12:03.284Z"
description: Learn how to build up an onboarding and login flow with React Native
---

## What are we doing?

Every app you build will need a login/signup funnel. It's one of the most basic building blocks of a modern app. Let's learn how to do it the fast and easy way using React Native.

Our goal is to create a React Native app with the following features:
- A user can create an account
- A user can log into their account
- Once logged in, the user can access the app home screen
- The user can manually log out
- When automatically logged out due to their session expiring, the user is taken to the login screen

## Requirements

You need a general knowledge of how modern JavaScript development works. I won't be explaining the nitty gritty of things like `npm` or how React Native actually functions.

## Setting up our project

Follow [this guide](https://facebook.github.io/react-native/docs/getting-started.html) to install dependencies and create your project. This tutorial will be aimed at developing for iOS as the target OS, using the React Native CLI approach (rather than Expo). If you want to use Expo and/or Android, you can probably modify some of the content to make it work.

Our project name can be whatever you want, but I'll be using `AuthenticationBoilerplate`.
