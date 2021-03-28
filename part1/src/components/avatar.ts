import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement('x-avatar')
class Avatar extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }

      img {
        width: 100%;
        max-height: 100%;
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
      `/assets/images/1x/${this.file} 64w`,
      `/assets/images/2x/${this.file} 128w`,
      `/assets/images/3x/${this.file} 192w`,
      `/assets/images/4x/${this.file} 256w`,
    ].join(',');
    const fallback = srcset[0];

    return html`
      <img class=${ifDefined(this.small ? 'small' : undefined)} srcset="${srcset}" sizes="17vmin" src="${fallback}" alt="${this.name}">
    `;
  }

}
