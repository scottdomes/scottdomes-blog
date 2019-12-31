---
title: Sexy forms in React Native
date: "2019-12-31T22:12:03.284Z"
description: Learn how to build beautiful & well-engineered forms for iOS
---

My last tutorial was on how to write [a simple login/signup flow in React Native](https://scottdomes.com/react-native-authentication/). That tutorial was itself a sequel to a rails tutorial on making [a simple login/signup back-end in Rails](https://scottdomes.com/rails-authentication-deploy/). So I guess you can say I’ve been an authentication kick.

There’s a reason for that. Authentication is essential boilerplate. Almost every app has to do it. It’s universal, so we might as well learn to do it well.

But while my last tutorial was intended to be a simple intro to authentication in React Native, what we ended up with was just a passable product. Our login form does the job but isn't particularly pretty, and isn't particular well coded.

This tutorial will fix that. We’re going to make a sexy, beautiful inside and out form. It’ll have a bunch of cool stuff written well. And then you can just reuse this for every app you ever make and you never have to worry about forms again.

## Why forms?

Forms are kind of boring for developers. Mostly because they ARE boilerplate-y, and they always take longer than you expect (especially in React)

But I hate to break it to you: most apps are just fancy forms. Many modern apps could be excel spreadsheets. I mean that. Most have pages and pages of forms for you to fill out, but they’re hidden well.

Making good forms is a big part of modern app design. So let’s make a good one.

## Good form principles

All forms should handle the basics:
- A user can enter the necessary information
- A user can submit the form

Beyond that, there's some stuff that most do well, but some (bafflingly) do not:
- A user should know when they filled the form out incorrectly (i.e. validation errors)
- A user should know when the form is submitting (i.e. loading state)
- A user should know what fields are for what (i.e. have labels for your fields, you dingbats. And no, placeholder text doesn't count)
- A user should know EXACTLY which fields have which errors

That's the user stuff. That's priority one.

But there's a good chance your app will have multiple forms. Perhaps many, many forms. Can we make them painless to build, too? Can we make reuseable form components that take away the legwork?

From a developer standpoint, we can also say:
- a developer should be able to create a basic form with just a few lines of code
- a developer should be able to specify various options for a form with only a few more lines

## A good form component

With the above developer stories, here's what I have in mind: a `<Form />` component that takes a `fields` props that specifies which inputs to create.

We could start with something like this:
```js
<Form fields={['First Name', 'Email', 'Password']} />
```
... which would create a form with three inputs.

That's fine, but we need more control than that. For example, the password field needs to have secure text entry (e.g. obfuscate the input). The email field should trigger the email keyboard on the phone.

Here's a more sophisticated version:
```js
<Form
  fields={
    {
      firstName: {
        label: 'First Name'
      },
      email: {
        label: 'Email',
        keyboardType: 'email-address',
      },
      password: {
        label: 'Password',
        secureTextEntry: true
      }
    }
  }
/>
```

This approach lets us pass in exactly the options we want for each input.

But there's one more wrinkle. Each field will likely have different validation rules. For example, we might insist that the user enters an actual, uh, email in the email field. For the password, we might want a length of eight characters.

What if we could also supply the validation for each field?

```js
<Form
  fields={
    {
      firstName: {
        label: 'First Name'
      },
      email: {
        label: 'Email',
        validators: [validateContent]
        inputProps: {
          keyboardType: 'email-address',
        }
      },
      password: {
        label: 'Password',
        validators: [validateContent, validateLength]
        inputProps: {
          secureTextEntry: true
        }
      }
    }
  }
/>
```

Now each field takes a `validators` array, which is just an array of functions. One such validator might look like so:
```js
export const validateContent = (text) => {
  if (!text) {
    return "Can't be blank";
  }
};
```

If there's an error, it returns a message. Otherwise it returns `undefined`.

We also split things like `secureTextEntry` into a `inputProps` key to designate that they are props that will be passed directly to the underlying input component.

Okay, so that's the plan! Our challenge here is to A) make it work and B) make it pretty.