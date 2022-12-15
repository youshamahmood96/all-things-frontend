---
puppeteer:
  format: "A4"
---

# React Notes:

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Why react components start with uppercase letters](#why-react-components-start-with-uppercase-letters)
- [When react app re-renders?](#when-react-app-re-renders)
- [Why would we use `useCallback()`?](#why-would-we-use-usecallback)
  - [Use cases:](#use-cases)

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