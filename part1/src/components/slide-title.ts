import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

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
          font-size: 30px;
          line-height: 32px;
          color: var(--slide-title-color);
          margin-bottom: 0.27em;
        }

        h2 {
          color: var(--slide-subheading-color);
          font-size: 16px;
          line-height: 18px;
          margin: 0;
        }

        .centered {
          text-align: center;
        }
      `
    ];
  }

  render() {
    return html`
      <h1
        class=${ifDefined(this.orientation === 'landscape' ? 'centered' : undefined)}
      >
        ${this.title}
      </h1>
      <h2
        class=${ifDefined(this.orientation === 'landscape' ? 'centered' : undefined)}
      >
        ${this.subtitle}
      </h2>
    `;
  }

}
