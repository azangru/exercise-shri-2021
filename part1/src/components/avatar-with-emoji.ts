import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement('avatar-with-emoji')
class AvatarWithEmoji extends LitElement {

  static get styles() {
    return css`
      .container {
        position: relative;
        display: inline-block;
      }

      .emoji {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% + 10px));
        z-index: 1;
        font-size: 32px;
        line-height: 1;
        top: 0;
      }
    `;
  }

  @property({type: String})
  emoji?: string;

  render() {
    return html`
      <div class="container">
        <span class="emoji">${this.emoji}</span>
        <slot></slot>
      </div>
    `;
  }

}
