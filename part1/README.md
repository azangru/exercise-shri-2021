# Summary

# Dev tools
If I was doing task 1 in isolation, I would have probably used Snowpack or maybe even esbuild to test its speed. But since task 3 was built with webpack, I thought it better to stick to webpack. 

# Issues for consideration

## Whether to use a templating library and if so, which one

Decided to use lit-html, mainly to check out the current state of web components and of the library that Google recommends.

What I don't like about lit-html and lit-element:
- the comments! all over the place!

## Theming

Problem: due to the shadow DOM isolation, web components are unaware of the classes of their parent components.

- variables pass the shadow DOM boundaries
- however, don't want to define all theme-specific component styles in the global styles component
- use some kind of a theme provider?
- the theme provider should observe the class of the root element

## Adaptive design

Reference designs are created only for the mobile screen; how should they scale up?

## RxJS to observe theme changes and orientation changes


## Challenges

- svg radial gradient

## What I like about LitElement
- Performance (checked with resizing the window and making the chart rerender)

## What I don't like about web components in general and lit/element/lit-html in particular

- Web components effectively use global variables through their names. How well is it going to scale for large projects?

- Can't compose svg from its parts using lit-html? E.g. the following didn't work:

```ts
${this.getSectors().map(sector => html`        
  <path d=${sector} fill="url(#grad1)"></path>
`)}
```
