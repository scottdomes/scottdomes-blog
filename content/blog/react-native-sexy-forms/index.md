---
title: Sexy forms in React Native
date: '2019-12-31T22:12:03.284Z'
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
  fields={{
    firstName: {
      label: 'First Name',
    },
    email: {
      label: 'Email',
      keyboardType: 'email-address',
    },
    password: {
      label: 'Password',
      secureTextEntry: true,
    },
  }}
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

## Getting started

For the purposes of this tutorial, I'm going to assume you followed [my initial guide for React Native authentication](https://scottdomes.com/react-native-authentication/).

If you haven't and can't be bothered to, the gist is that we have three main screens: HomeScreen, LoginScreen, and CreateAccountScreen. The latter two share an EmailForm component. We also have a `fetch` utility for communicating with our back-end.

The first thing we're going to do is improve that utility.

## Formatting request results

In our first tutorial, we built fetch methods like so:

```js
export const post = async (destination, body) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (result.ok) {
    return await result.json();
  }
  throw { error: result.status };
};
```

Basically, if the request was good, we return the data. If it wasn't, we throw an error.

While working on this tutorial, I decided I didn't love that approach. Throwing errors is a bit strange and unpredictable for the engineers using these methods. I decided I'd rather return a uniform result object with all the relevant info.

Here's what we want to return from every single request:

```js
const formattedResult = {
  status: result.status, // The HTTP code e.g. 404
  ok: result.ok, // Boolean value as to whether the request succeeded
  data: await res.json(), // Parsed JSON of the actual data. We only want this if the request succeeds
};
```

So with the above in mind, let's introduce a new method to `src/api/fetch.js`:

```js
const formatResult = async (result) => {
  const formatted = {
    status: result.status,
    ok: result.ok,
  };

  if (result.ok) {
    formatted.data = await result.json();
  }

  return formatted;
};
```

This is a nice clean, asynchronous method we can now invoke from our `get` and `post` methods:

```js
export const post = async (destination, body) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const formattedResult = await formatResult(result);
  return formattedResult;
};
```

Is this essential? No. Will it make our lives easier down the line? Yes.

## Setting up our form

You know that nice, lovely EmailForm component we made last time? Delete it.

Yep, we're starting from scratch. Delete it and make a file in `src/forms/` called `Form.js`.

Here's what we can start with:

```jsx
import React from 'react';
import { Text } from 'react-native';

const Form = () => {
  return <Text>I am FORM</Text>;
};

export default Form;
```

High-end engineering, this.

Rewrite `LoginScreen` and `CreateAccountScreen` to look like so:

```jsx
import React from 'react';
import Form from '../forms/Form';

const CreateAccount = ({ navigation }) => {
  return <Form />;
};

export default CreateAccount;
```

Your app should now look like so:
![](./iamform.png)

Great start?

One more logistical thing: let's make the login screen the first screen we land on for development purposes. In `App.js`, change the `initialRouteName` to `'Login'`.

## Form options

Since we already have an idea of the props structure of our form, let's fill that in, then make it work.

In `LoginScreen`:

```jsx
import React from 'react';
import Form from '../forms/Form';

const LoginScreen = ({ navigation }) => {
  return (
    <Form
      fields={{
        email: {
          label: 'Email',
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
          inputProps: {
            secureTextEntry: true,
          },
        },
      }}
    />
  );
};

export default LoginScreen;
```

Our login form will have an `email` and a `password` field. The email field will trigger the user's phone's email keyboard, and the password field will have obfuscated text entry. The only thing missing here is the validation, which we'll leave for later.

In our `Form` component, we now need to create an input for each field:

```jsx
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form = ({ fields }) => {
  const fieldKeys = Object.keys(fields);

  return fieldKeys.map((key) => {
    const field = fields[key];
    return (
      <View key={key}>
        <Text>{field.label}</Text>
        <TextInput {...field.inputProps} />
      </View>
    );
  });
};

export default Form;
```

We iterate over the `keys` of the `fields` object, and use that to create a `TextInput` and label for each one. For the `inputProps`, we just spread them over the input component. Note that this approach is not very tightly controlled: it's up to the engineer using `Form` to implement everything correctly.

This should yield the following result:
![](./basicfields.png)

## Controlling values

Our inputs are currently uncontrolled. When text is entered and their values change, we don't keep track of it. But we need to.

We're going to dynamically create a `values` object and store that in the state of `Form`. Here's what that looks like, using React hooks:

```jsx
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ fields }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  return fieldKeys.map((key) => {
    const field = fields[key];
    return (
      <View key={key}>
        <Text>{field.label}</Text>
        <TextInput
          {...field.inputProps}
          value={values[key]}
          onChangeText={(text) => onChangeValue(key, text)}
        />
      </View>
    );
  });
};

export default Form;
```

We use a `getInitialState` function to construct an object with an empty string assigned to each field key. We then pass a `value` and `onChangeText` prop to `TextInput`, which calls a method that updates the entire state object.

Since it's impossible for a user to update multiple fields at once, we don't have to worry about race conditions here.

You can test this is working by `console.log(values)` right before the `return`, and then typing some content into our fields.

## Submitting

First let's create a 'submit' button for our form, and then we'll talk about what happens when it's clicked.

The button in `Form.js`:

```jsx
return (
  <View>
    {fieldKeys.map((key) => {
      const field = fields[key];
      return (
        <View key={key}>
          <Text>{field.label}</Text>
          <TextInput
            {...field.inputProps}
            value={values[key]}
            onChangeText={(text) => onChangeValue(key, text)}
          />
        </View>
      );
    })}
    <Button title={buttonText} />
  </View>
);
```

This requires a new `buttonText` prop for `Form`. Create that prop and then pass in "Submit" from `LoginScreen`.

The result:
![](./submitbutton.png)

Great, but it doesn't _do_ anything. So what do we want to happen?

Well, we need to send the values for the `email` and `password` fields to the back-end. This is specific to _this_ form, so we need the submit action to be a custom prop passed to `Form`.

In `LoginScreen`:

```jsx
import React from 'react';
import Form from '../forms/Form';
import { login } from '../api/authentication';

const LoginScreen = ({ navigation }) => {
  return (
    <Form
      action={login}
      buttonText="Submit"
      fields={{
        email: {
          label: 'Email',
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
          inputProps: {
            secureTextEntry: true,
          },
        },
      }}
    />
  );
};

export default LoginScreen;
```

We pass a new `action` prop to decide what to happen. Now, let's make it work:

```jsx
const Form = ({ fields, buttonText, action }) => {
  // ... same code

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const submit = async () => {
    const values = getValues();
    const result = await action(...values);
    console.log(result);
  };

  // ... same code
  // But add the onPress:
  <Button title={buttonText} onPress={submit} />;
  // ... same code
};
```

First, we create a `submit` function and grab the values from state. Then we pass those values to the `action` prop, spreading the array as arguments. Note that `getValues` calls `sort` on the keys, which means the values will be passed to the action in alphabetical order. This makes our output easier to predict.

Here's our old `login` method we made before:

```js
export const login = (email, password) => {
  return post('/users/login', {
    user: { email, password },
  });
};
```

Based on our new code, this should just work. Our `console.log` should spit out this result for a successful login:

```js
{status: 200, ok: true, data: {…}}
```

For a wrong email/password combination:

```js
{status: 401, ok: false}
```

Great work!

## After submission

After a successful login submission, we want to redirect them to the home page. After a failed submission, we want to display a message like 'Invalid email/password combination'.

Again, this is something that will differ between each form. So let's make a new prop for `Form.js` called `afterSubmit`.

```jsx
import React from 'react';
import Form from '../forms/Form';
import { login } from '../api/authentication';
import { setToken } from '../api/token';

const LoginScreen = ({ navigation }) => {
  const handleResult = async (result) => {
    if (result.ok && result.data) {
      await setToken(result.data.auth_token);
      navigation.navigate('Home');
    } else if (result.status === 401) {
      throw new Error('Invalid login.');
    } else {
      throw new Error('Something went wrong.');
    }
  };

  return (
    <Form
      action={login}
      afterSubmit={handleResult}
      buttonText="Submit"
      fields={{
        email: {
          label: 'Email',
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
          inputProps: {
            secureTextEntry: true,
          },
        },
      }}
    />
  );
};

export default LoginScreen;
```

Now, when the `afterSubmit` prop is called, we'll check the result. If the result of the request is a success, we take the token and redirect to the HomeScreen. If the result is a 401, we tell the user their login was invalid. If the result is anything else, we show a general error message.

And yes, we're bringing back error throwing! Here, we're using it in a more specific setting, to indicate a failed request and thus tell the form to show an error. Here, I believe it makes sense.

Here's our new `submit` method in `Form.js`:

```jsx
const Form = ({ fields, buttonText, action, afterSubmit }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const submit = async () => {
    const values = getValues();
    const result = await action(...values);
    try {
      await afterSubmit(result)
    } catch(e) {
      console.log('error:', e)
    }
  };
```

Now, we call `afterSubmit` (wrapped in a try/catch). If there's an error, we should see it logged out. If the login succeeds, we should go to the home page.

Last thing: we need to display the error to the user:

```jsx
const Form = ({ fields, buttonText, action, afterSubmit }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');

  // rest of code

  const submit = async () => {
    const values = getValues();
    const result = await action(...values);
    try {
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <View>
      <Text>{errorMessage}</Text>
      // rest of code
    </View>
  );
};
```

We create an `errorMessage` hook and set it to the error message in our catch. Then, we display it to the user. The result, after a failed login:
![](./failedlogin.png)
