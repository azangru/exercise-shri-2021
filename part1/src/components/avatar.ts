import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement('x-avatar')
class Avatar extends LitElement {

  static get styles() {
    return css`
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        filter: var(--avatar-photo-filter, none);
      }

      img.small {
        width: 40px;
        height: 40px;
      }
    `;
  }

  @property({type: String})
  name: string = ''

  @property({type: String})
  file: string = ''

  @property({type: Boolean})
  small: boolean = false

  render() {
    const srcset = [
      `/assets/images/1x/${this.file} 1x`,
      `/assets/images/2x/${this.file} 2x`,
      `/assets/images/3x/${this.file} 3x`,
      `/assets/images/4x/${this.file} 4x`,
    ].join(',');
    const fallback = srcset[0];

    return html`
      <img class=${ifDefined(this.small ? 'small' : undefined)} srcset="${srcset}" src="${fallback}" alt="${this.name}">
    `;
  }

}
