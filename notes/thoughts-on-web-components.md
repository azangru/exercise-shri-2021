# Thoughts about web components after the work on part 1

I've had a play with web components using lit-element recently, building several pages with them, and have formed some opinions.

The most enlightening one was that, from the perspective of a parent html element, a web component is just another web element. Which means that you can, through css, assign styles to it (width, height, margins, behavior inside a flexbox or a grid context, etc.). This is an interaction that I've never experienced with my React components.

It was also pretty amusing to be able to assign an attribute to a web component, and then, inside the component's shadow DOM, to be able to react to that attribute by using the `:host` CSS selector. For example, the parent's markup might look like this:

```html
<my-component theme="dark"></my-component>
```

and then the child (in this case, based on LitElement), can pick this up like so:

```js
class MyComponent extends LitElement {

  static get styles() {
    return css`
      :host([theme="dark"]) .some-inner-class {
        background: black;
      }
    `
  }
}
```

The whole reason behind this acrobatics is, of course, shadow DOM. Which is a mixed blessing. It's great if you are building individual web components that can be imported and reqused by third parties, and you don't want the CSS of those third parties to interfere with the styling of your component. But if you are buiding a whole page based on such components, like what you typically do with front-end frameworks, shadow DOM is a nuisance more often than it is of help. You do want to be able to set some global styles for your page as a whole, even if they are just the reset of the box model unfortunately chosen by CSS standards group as default:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

This is probably the reason why youtube, whose site is built with web components, seems to have opted out of the shadow DOM. Indeed, writing styles for web-components-based applications that use shadow DOM seems to be the most common source of befuddlement and consternation in online communications (blog posts etc.). There are some CSS properties that are able to cross shadow DOM boundaries (color, CSS variables, and font properties); but others cannot. At first, this is baffling.

What left the strongest negative impression was the realization that web components, by the virtue of their custom elements declared globally, pollute the global scope with the names of custom elements. We already had this problem with CSS, when the larger an application the easier it was to have a class name collision, with all the styling hell that ensued. Whole methodologies were developed, relying first on developer's self-discipline (BEM, SMACSS), then on tooling (CSS modules) to avoid such collisions. Custom elements, I feel, is a step back to that shaky ground where extra care needs to be taken to ensure that the name of every custom element across the whole application is unique. Again, just as shadow DOM, it makes sense when you are developing a library of components to be used by third parties; but hardly passes muster when you are building a whole app out of such components. With traditional frameworks, this problem doesn't exist.

A close second in the list of negative impressions was ill-suited custom elements are for typescript. When your component is a function or a class — such as in React of Preact, or other libraries based on jsx or hyperscript — typescript can easily check that the properties passed from a parent to a child meet the child's interface requirements. I don't know how well this is checked in Angular's or Vue's template literals, but in lit-element it seems that there isn't any checking at all. Even if there were some clever typescript plugin that could parse the template strings and check the values passed to a custom element, lit-element's api doesn't seem to distinguish between what the component needs to receive from the outside and what it can create as its own inner state, which means that typescript wouldn't be able to verify that all data requirements of the component are satisfied. Both component's inner state and the properties (or attributes! web components have this peculiar distinction between the two kinds of data they can receive from the outside) passed from the parent are expressed in `lit-element` using the observable `@property` decorator. When a property adorned with this decorator is updated, either from the outside of from the inside of the component, the component re-renders. Compared to the clear separation props and state in something like React, this is far less elegant, and also feels far less safe.

Several other, lesser grudges against web components in general and the lit ecosystem in particular.

- Until the next release of lit-html, it cannot render html tags dynamically, i.e. you cannot programmatically choose between, say, an `a` tag or a `span` tag for your element. This is a pretty noticeable omission, but the fix, as they promise, is coming. As is server-side rendering, the lack of which is another deal-breaker for many.
- I could not dynamically combine an svg out of its parts, like so (which shouldn't be a problem in React):

```js
const defs = html`
  <defs>
    <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad1">
      <stop offset="0%" stop-color="red"></stop>
      <stop offset="100%" stop-color="blue"></stop>
    </radialGradient>
  </defs>
`;

const svg = html`
  <svg>
    ${defs}
    <path d=${somePath} fill="url(#grad1)"></path>
  </svg>
`
```

- In contrast to something like React, web components don't return fragments. I.e. if you render a custom element called "my-component", you are adding the "my-component" element to the DOM. You can not, like you can in jsx, just add its children to the DOM without the "my-component" wrapper.
- While React has portals, with which small fragments of DOM can be rendered in arbitrary locations (can be useful for popups, tooltips and such), it's hard to imagine such semantics for web components. 

To conclude, this experiment with web components gave me a better appreciation both of web components and of traditional frontend frameworks. It made me less certain that lit-element would be a good replacement for a framework for building a large-scale single-page app.
