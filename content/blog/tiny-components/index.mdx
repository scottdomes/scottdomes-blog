---
title: Tiny Components in React
date: "2019-01-16T23:46:37.121Z"
description: Using the Single Responsibility Principle to build better apps
---

![Photo by [Austin Kirk](https://unsplash.com/photos/QZenflkkwt0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/puppy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](./banner.jpeg)*Photo by [Austin Kirk](https://unsplash.com/photos/QZenflkkwt0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/puppy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

The advantage of the component system in React (and view libraries like it) is that your UI gets split into small, digestible, reusable chunks.

Each component is usually compact (100–200 lines), a size which is easy for other developers to understand and modify.

But while component brevity tends to be the case, there’s no hard and fast rule. React will not complain if you decide to package your app into one monolithically monstrous 3000 line component.

…but you shouldn’t. In fact, *most* of your components are probably too big—or rather, doing too much.

In this article, I’ll make the case that most components (even the regular 200 line ones) should be much more focused. They should do only one thing, and do it well. Here is how Addy Osmani describes it beautifully:
[**Title Components Should Be Focused, Independent, Reusable, Small And Testable (FIRST)**](https://addyosmani.com/first/)

Let’s start with an example of how component creation can **go wrong**.

### Our App

Imagine you have a standard social media-esque app, with a main screen:

```jsx
class Main extends React.Component {
  render() {
    return (
      <div>
        <header>
          // Header JSX
        </header>
        <aside id="header">
          // Sidebar JSX
        </aside>
        <div id="post-container">
          {this.state.posts.map(post => {
            return (
              <div className="post">
                // Post JSX
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
```
*(This example, like many more to come, should be considered pseudo-code.)*

It displays a header, a sidebar, and a list of posts. Simple.

Since we also need to load the posts, we can do so when the component mounts:

```jsx
class Main extends React.Component {
  state = { posts: [] };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    // Load posts and save to state
  }

  render() {
    // Render code
  }
}
```

We also have some logic for triggering the sidebar. If the user clicks a button in the header, the sidebar slides in. They can either close it from the header again, or from the sidebar itself.

```jsx
class Main extends React.Component {
  state = { posts: [], isSidebarOpen: false };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    // Load posts and save to state
  }

  handleOpenSidebar() {
    // Open sidebar by changing state
  }
  handleCloseSidebar() {
    // Close sidebar by changing state
  }

  render() {
    // Render code
  }
}
```

Our component is now a bit more complex, but is still easy to understand.

We can argue it’s *concerned* with one thing: rendering the main page of the app. It thus follows the Single Responsibility Principle.

The Single Responsibility Principle says that a component should only ever do one thing. To paraphrase [Wikipedia](https://en.wikipedia.org/wiki/Single_responsibility_principle), it “should have responsibility over a single part of the functionality provided by the [app]”.

Our Main component passes that test. So what’s the problem?

Here’s a different way to phrase the same principle:
> # A [component] should have only *one reason to change.*

This definition comes from Robert Martin in his book [Agile Software Development](https://books.google.com/books?id=0HYhAQAAIAAJ&redir_esc=y), and it matters a lot.

If we focus on *one reason to change* for our components, we’ll build better, more maintainable applications.

To illustrate why, let’s complicate our component.

### Complications

Let’s say that a month after we first implemented the Main component, a developer on our team is assigned a new feature. Now, a user can hide a certain post (e.g. if it contains inappropriate content).

Easy enough to add!

```jsx
class Main extends React.Component {
  state = { posts: [], isSidebarOpen: false, postsToHide: [] };

  // older methods

  get filteredPosts() {
    // Return posts in state, without the postsToHide
  }

  render() {
    return (
      <div>
        <header>
          // Header JSX
        </header>
        <aside id="header">
          // Sidebar JSX
        </aside>
        <div id="post-container">
          {this.filteredPosts.map(post => {
            return (
              <div className="post">
                // Post JSX
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
```

Our teammate did this in a clean way. She only added a single new method, plus one new state property. No one viewing the summary of her changes has much reason to object.

A couple of weeks later, another new feature is announced—a streamlined sidebar for mobile. Rather than mess around with a CSS implementation, the developer decides to make some new JSX that can only be triggered on mobile.

```jsx
class Main extends React.Component {
  state = {
    posts: [],
    isSidebarOpen: false,
    postsToHide: [],
    isMobileSidebarOpen: false
  };

  // older methods

  handleOpenSidebar() {
    if (this.isMobile()) {
      this.openMobileSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    // Open regular sidebar
  }

  openMobileSidebar() {
    // Open mobile sidebar
  }

  isMobile() {
    // Check if mobile device
  }

  render() {
    // Render method
  }
}
```

Another clean implementation. A couple of new, well-named methods, and a new state property.

But we’re starting to have a problem. Main still only “does” one thing (render the main screen), but look at all the methods we now have to deal with:

```jsx
class Main extends React.Component {
  state = {
    posts: [],
    isSidebarOpen: false,
    postsToHide: [],
    isMobileSidebarOpen: false
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    // Load posts and save to state
  }

  handleOpenSidebar() {
    // Check if mobile then open relevant sidebar
  }

  handleCloseSidebar() {
    // Close both sidebars
  }

  openSidebar() {
    // Open regular sidebar
  }

  openMobileSidebar() {
    // Open mobile sidebar
  }

  isMobile() {
    // Check if mobile device
  }

  get filteredPosts() {
    // Return posts in state, without the postsToHide
  }

  render() {
    // Render method
  }
}
```

Our component is becoming big and bulky and hard to follow. It’s only going to get worse over time, as more functionality is added.

What went wrong?

### One reason

Let’s come back to that better definition of the Single Responsibility Principle: *a component should only ever have one reason to change*.

Above, the way we displayed posts changed, so we changed our Main component. Then, the way we opened the sidebar changed, so we changed our Main component.

Our component has multiple unrelated reasons to change. *That means the component is doing too much.*

To do put it another way: if you can significantly change one part of your component, without affecting another part, your component has too much responsibility.

### A better division

The solution is simple: divide Main into smaller components. But how do we divvy it up?

Let’s start at the top. We’ll keep our Main’s responsibility as “rendering the main view.” But we’ll slim it down to literally just render the relevant components:

```jsx
class Main extends React.Component {
  render() {
    return (
      <Layout>
        <PostList />
      </Layout>
    );
  }
}
```

Ah. Lovely.

If we ever change the way our main view is rendered—e.g. adding additional sections—we’ll change Main. But other than that, we’ll never have a reason to touch it. Perfect.

Let’s dive down into Layout:

```jsx
class Layout extends React.Component {
  render() {
    return (
      <SidebarDisplay>
        {(isSidebarOpen, toggleSidebar) => (
          <div>
            <Header openSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} close={toggleSidebar} />
          </div>
        )}
      </SidebarDisplay>
    );
  }
}
```

This is a bit more complex. Layout is solely responsible for rendering the layout components (sidebar/header). We resist the temptation to make it responsible for determining whether the sidebar is open.

Instead, we extract that to a SidebarDisplay component, which passes down the necessary methods/state to the Header and Sidebar.

*(The above is an example of the [Render Props via Children](https://reactjs.org/docs/render-props.html) pattern in React. If you’re unfamiliar with it, don’t worry too much about the particulars. The important part is that managing sidebar open/close state is in its own component).*

Then, Sidebar itself can be quite simple, just focusing on rendering the right sidebar:

```jsx
class Sidebar extends React.Component {
  isMobile() {
    // Check if mobile
  }

  render() {
    if (this.isMobile()) {
      return <MobileSidebar />;
    } else {
      return <DesktopSidebar />;
    }
  }
}
```

Again, we resist the temptation to put the desktop/mobile JSX straight into this component, since that would give this component two reasons to change.

One more component to look at:

```jsx
class PostList extends React.Component {
  state = { postsToHide: [] }

  filterPosts(posts) {
    // Show posts, minus hidden ones
  }

  hidePost(post) {
    // Save hidden post to state
  }

  render() {
    return (
      <PostLoader>
        {
          posts => this.filterPosts(posts).map(post => <Post />)
        }
      </PostLoader>
    )
  }
}
```

PostList only changes if we change how we render the list of posts. Sounds pretty obvious, eh? That’s what we’re aiming for.

PostLoader only changes if we change how we load posts. Lastly, Post only changes if we change how we render a post.

### Conclusion

These components are all tiny and do one small thing. They’re super easy to test, reason about, and maintain.

Modifying our app (moving around components, adding new functionality, extending current functionality) is now very easy to do. Just glancing at any component file will tell you **exactly** what it is for.

We know our components are going to grow and change over time, but using this rule of thumb will prevent technical debt, and improve team velocity. How you divide your components is up to you, but remember: **one reason to change.**

Thanks for reading, and please feel free to comment!
