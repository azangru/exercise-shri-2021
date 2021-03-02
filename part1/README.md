# Summary

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
