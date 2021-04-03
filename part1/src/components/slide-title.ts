import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement('slide-title')
class SlideTitle extends LitElement {

  @property({ type: String })
  orientation!: string;

  @property({ type: String })
  title!: string;

  @property({ type: String })
  subtitle!: string;

  static get styles() {
    return [
      css`
        h1 {
          font-family: var(--font-family-bold);
          font-size: 8vmin;
          line-height: 1.07;
          color: var(--slide-title-color);
          margin-bottom: 0.27em;
        }

        @media (min-aspect-ratio: 13/16) and (max-aspect-ratio: 1/1) {
          h1 {
            font-size: 6vmin;
          }
        }

        h2 {
          color: var(--slide-subheading-color);
          font-size: min(4.25vw, 4.25vh);
          margin: 0;
        }

        @media  (orientation: landscape) {
          :host {
            text-align: center;          
          }
        }
      `
    ];
  }

  render() {
    return html`
      <h1>
        ${this.title}
      </h1>
      <h2>
        ${this.subtitle}
      </h2>
    `;
  }

}
