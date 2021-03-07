import { LitElement, html, customElement, property } from 'lit-element';


@customElement('activity-indicator')
class ActtivityIndicator extends LitElement {

  @property({ type: String })
  theme!: string;

  @property({ type: Number })
  activity!: number;

  getImagePath() {
    let imageName: string;
    if (!this.activity) {
      imageName = 'min';
    } else if (this.activity < 3) {
      imageName = 'mid';
    } else if (this.activity < 5) {
      imageName = 'max';
    } else {
      imageName = 'extra';
    }

    return `/assets/images/${imageName}-${this.theme}.svg`;
  }

  render() {
    return html`
      <img src=${this.getImagePath()} />
    `;
  }

}
