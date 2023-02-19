---
puppeteer:
  format: "A4"
---

# React Notes:

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [React Notes:](#react-notes)
  - [Why react components start with uppercase letters](#why-react-components-start-with-uppercase-letters)
  - [When react app re-renders?](#when-react-app-re-renders)
  - [Why would we use `useCallback()`?](#why-would-we-use-usecallback)
    - [Use cases:](#use-cases)
  - [React composition](#react-composition)
    - [How can composition can be used to avoid prop drilling?](#how-can-composition-can-be-used-to-avoid-prop-drilling)
      - [Prop drilled version](#prop-drilled-version)
      - [Composition version](#composition-version)
    - [How can composition help perfomance?](#how-can-composition-help-perfomance)
      - [Without composition](#without-composition)
      - [With composition](#with-composition)
  - [How to debounce and throttle callbacks](#how-to-debounce-and-throttle-callbacks)

<!-- /code_chunk_output -->

## Why react components start with uppercase letters

In JSX, lower-case tag names are considered to be HTML tags. However, lower-case tag names with a dot (property accessor) aren't.

## When react app re-renders?

Every re-render in React starts with a state ch∏ange. It's the only “trigger” in React for a component to re-render.

Now, that probably doesn't sound right... after all, don't components re-render when their props change? What about context??

Here's the thing: when a component re-renders, it also re-renders all of its descendants.

Points to note:

- Re-renders only affect the component that owns the `state` and its descedants.
- A component doesnt re-render when its `props` change. It re-renders following the first note.

[see this article for understanding this better and learn about `React.memo`](https://www.joshwcomeau.com/react/why-react-re-renders/)

## Why would we use `useCallback()`?

_Refer to this [link](https://dmitripavlutin.com/react-usecallback/)_

### Use cases:

1. A functional component wrapped inside React.memo() accepts a function object prop

2. When the function object is a dependency to other hooks, e.g. useEffect(..., [callback])

3. When the function has some internal state, e.g. when the function is debounced or throttled.

## React composition

Component composition is the name for passing components as props to other components, thus creating new components with other components.

[Read the longer version here](https://felixgerschau.com/react-component-composition/)

### How can composition can be used to avoid prop drilling?

#### Prop drilled version

```jsx
const App = () => {
  const userName = "Joe";

  return <WelcomePage userName={userName} />;
};

const WelcomePage = ({ userName }) => {
  return (
    <>
      <WelcomeMessage userName={userName} />
      {/** Some other welcome page code */}
    </>
  );
};

const WelcomeMessage = ({ userName }) => {
  return <h1>Hey, {userName}!</h1>;
};
```

#### Composition version

```jsx
const App = () => {
  const userName = "Joe";

  return <WelcomePage title={<WelcomeMessage userName={userName} />} />;
};

const WelcomePage = ({ title }) => {
  return (
    <>
      {title}
      {/** Some other welcome page code */}
    </>
  );
};

const WelcomeMessage = ({ userName }) => {
  return <h1>Hey, {userName}!</h1>;
};
```

### How can composition help perfomance?

#### Without composition

```jsx
const Post = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const scrollListener = () => {
      // update the progress based on the scroll position
    };

    window.addEventListener("scroll", scrollListener, false);
  }, []);

  return (
    <>
      <h2 className="progress">Progress: {progress}%</h2>
      <div className="content">
        <h1>Content Title</h1>
        {/** more content */}
      </div>
    </>
  );
};
```

`<Post/>` will rerender everytime `progress` changes. This is because the `progress` state is defined inside the component.

#### With composition

```jsx
const PostLayout = ({ children }) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const scrollListener = () => {
      // update the progress based on the scroll position
    };

    window.addEventListener("scroll", scrollListener, false);
  }, []);

  return (
    <>
      <h2 className="progress">Progress: {progress}%</h2>
      {children}
    </>
  );
};

const Post = () => {
  return (
    <PostLayout>
      <div className="content">
        <h1>Content Title</h1>
        {/** more content */}
      </div>
    </PostLayout>
  );
};
```

`<Post/>` will only render once, `<PostLayout/>` will rerender everytime `progress` changes.

## How to debounce and throttle callbacks

[Refer to this article](https://dmitripavlutin.com/react-throttle-debounce/#2-debouncing-a-callback-the-first-attempt)
