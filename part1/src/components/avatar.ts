import {LitElement, html, customElement, property} from 'lit-element';

@customElement('x-avatar')
class Avatar extends LitElement {

  @property({type: String})
  name: string = ''

  @property({type: String})
  file: string = ''

  render() {
    const srcset = [
      `/assets/images/1x/${this.file} 1x`,
      `/assets/images/2x/${this.file} 2x`,
      `/assets/images/3x/${this.file} 3x`,
      `/assets/images/4x/${this.file} 4x`,
    ].join(',');
    const fallback = srcset[0];

    return html`
      <img srcset="${srcset}" src="${fallback}" alt="${this.name}">
    `;
  }

}
