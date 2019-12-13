---
title: How to write great React
date: "2019-08-19T22:12:03.284Z"
description: Five points to remember
---

![](./banner.png)

Writing this article started with a question: if I could give a new developer **one piece of advice** to help them write great React, what would it be?

My answer: **write clean components by following the rules of writing clean functions.**

### Why focus on writing components?

Our goal is to write React applications that are **easy to read, easy to maintain, and easy to extend.**

There are a lot of factors that go into this: architecture, state management, file structure, code formatting, etc etc.

But **the bulk of our application**—the bulk of the code our team will be working with—**will be components**.

**If your components are all clean and concise, your team can move faster.**

Will this guarantee a great application? No. The rest of your architecture could be a mess.

But it’s much harder to build bad architecture out of good components.

So how do we write good components? First step: **always treat them as functions.**

### Components as functions

Some React components are functions.

    const Button = ({ text, onClick }) => (
      <button onClick={onClick}>{text}</button>
    )

Others are not functions, but classes with a render method.

    class Button extends Component {
      render() {
        const { text, onClick } = this.props;
        return <button onClick={onClick}>{text}</button>;
      }
    }

Even in the first case, **it’s easy to stop thinking of components as functions**. We start conceptualizing a component as its own entity, governed by different rules.

With class components, it’s even easier to forget that the core portion of the component is the render method: a function that returns a segment of the UI.

When we forget to treat components as functions, we create components that are big and hard to reason about. They do too much, accept too many props, or have too many conditionals. They’re difficult to work with or improve. They make our brain hurt.

**Always treating components as functions** (whether they are functional or class-based) is the first step to great React.

Here’s why.

## Writing great functions

Let’s step away from React for a moment, and ask: **what makes a good function?**

Robert Martin’s classic *Clean Code* highlights five factors:

1. Small

1. Does one thing

1. One level of abstraction

1. Less than three arguments

1. Descriptive name

Let’s talk about each of these rules in turn, and what they mean for our React components.

### Your component should be small
> The first rule of functions is that they should be small. The second rule of functions is that **they should be smaller than that**. — Clean Code

Small functions are easier to read. Nobody wants to work with a 500-line function. Robert Martin argues functions should rarely be longer than 20 lines.

With React components, the rules are a bit different, since JSX tends to take up more lines even for simple elements.

50 lines is a good rule of thumb for the body of your component (for class components, that is the *render* method). If looking at the total lines of the file is easier, **most component files should not exceed 250 lines**. Under 100 is ideal.

**Keep your components small.**

![](./principle1.png)

### Your component should do one thing

I wrote extensively on this subject in my article[ *Tiny Components: What could go wrong?](https://blog.bitsrc.io/tiny-components-what-can-go-wrong-d6aa42d71370).*
[**Tiny Components: What Can Go Wrong?**
*Using the Single Responsibility Principle to build better apps*blog.bitsrc.io](https://blog.bitsrc.io/tiny-components-what-can-go-wrong-d6aa42d71370)

In short, your components should have only one main responsibility: **one reason to change**.

If you need to change MenuList.jsx because you’ve decided to switch up the order of the menu items, that’s good. If you *also* need to change MenuList.jsx because you’ve adjusted how the sidebar opens, that’s bad.

**Split your UI into tiny chunks that each handle one thing.**

![](./principle2.png)

### Your component should have one level of abstraction

Here’s a function with multiple levels of abstraction (pseudo-code):

    const loadThings = async () => {
        setIsLoading(true);
        const response = await fetchThings();
        setIsLoading(false);
        const { error, data } = response;
        if (error) {
            if (error.status === 404) {
                redirectTo('/404');
            } else if (error.status === 500) {
                redirectTo('/error');
            }
        } else {
            const thingsToUpdate = data.ids.reduce((map, id) => {
                map[id] = data.things[id];

                return map;
            }, {});

            updateThingsInState(thingsToUpdate);
        }
    };

Note that some things are abstracted away to other functions: setting the loading state and fetching the response from the server. Others are not: redirecting on error, and updating the things in state.

Here’s a cleaner approach:

    const handleResponse = (response) => {
        const { error, data } = response;
        if (error) {
            handleError(error);
        } else {
            updateThingsInState(data);
        }
    };

    const loadThings = async () => {
        setIsLoading(true);
        const response = await fetchThings();
        setIsLoading(false);
        handleResponse(response);
    };

Now loadThings is easy to read. Line by line, it invokes other functions to handle the tasks involved with loading the data. Our new function handleResponse is also simple, containing a single condition. One level of abstraction throughout.

Here’s a mixed-abstraction React component:

    const Dashboard = () => {
        return (
            <div className="Dashboard">
                <header>
                    <h1>Too Little Abstraction Corp.</h1>
                    <nav>
                        <a href="/about">About</a>
                        <a href="/mission">Mission</a>
                        <a href="/faq">FAQ</a>
                        <a href="/contact">Contact</a>
                    </nav>
                </header>
                <ProductDescription />
                <EmailSubscriptionForm />
                <footer>
                  <h2>Thanks for visiting!</h2>
                </footer>
            </div>
        )
    }

Some of the markup is abstracted into subcomponents (<ProductDescription />, <EmailSubscriptionForm />) but the header and footer are not.

This is also a very simple example: in the wild you’ll encounter components that mix dozens (or hundreds) of lines of raw markup with subcomponents.

Our Dashboard component is doing too much. There’s too many reasons to change this file, and it’s harder to read due to a lack of abstraction.

Solution:

    const Dashboard = () => {
        return (
            <div className="Dashboard">
                <Header />
                <ProductDescription />
                <EmailSubscriptionForm />
                <Footer />
            </div>
        )
    }

Incredibly easy to read. You’ll almost never have to touch this file, unless you decide to add a new subcomponent.

Each subcomponent can also be shared and modified as needed. When you edit Header, there’s no risk of breaking Footer.

Mixed abstraction is an easy trap to fall into, because it makes sense at the time (“I’m only adding a little markup, it doesn’t need to be its own component!”). But over time it leads to complex components that are difficult to parse.

If you try to keep your components at *roughly* one level of abstraction (with a few minor exceptions, such as wrapping divs, being acceptable), they’ll be much easier to maintain.

**Limit your components to one level of abstraction.**

![](./principle3.png)

### Your component should have only a few arguments (props)
> **The ideal number of arguments for a function** is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three **arguments** (triadic) should be avoided where possible. More than three (polyadic) requires very special justification — and then shouldn’t be used anyway.. — Clean Code

Yes, *technically* React components only receive two arguments, props and context. But props are, in essence, parameters to your function, and should be treated as such.

In practice, writing components with one to two props is really hard, especially since some components consume props in order to pass them down to subcomponents.

Here’s a more relaxed rule of thumb. **Three props is fine. Five props** **is a code smell. More than seven props is a crisis.**

Proper composition should help you avoid passing props through multiple components. Try to handle events at the lowest possible point in the component tree.

As a side note, **boolean props add unnecessary complexity.** Filip Danić has an [excellent article](https://spicefactory.co/blog/2019/03/26/how-to-avoid-the-boolean-trap-when-designing-react-components/) on the subject.

**Limit your components to three props or less.**

![](./principle4.png)

### Your component should have a descriptive name

This one seems the easiest, and it should be!

In fact, having a hard time naming your component is a sign it’s doing too much. **The answer to “what does this component do?” should be simple**, and lend itself to a descriptive name.

If a developer is scanning the component tree of your app, he should get a full and clear picture of what each component does. No surprises.

Here’s an even better rule: **ask yourself, “If I told a user the name of this component, would she be able to point it out in the UI and/or guess what it does?”**

**Components should not have technical, abstract names.** <TodoListItem>? Easy to understand. <PortfolioLoader>? More abstract, but still intuitive. <UserViewModelInterface>? Uhh…

**Keep your component names concrete and descriptive.**

![](./principle5.png)

## Final thoughts

Do you follow these rules when writing components? Why, or why not? What other rules do you follow?

If you have thoughts, questions, or revisions you’d like to suggest, let me know in the comments.

Thanks for reading.
