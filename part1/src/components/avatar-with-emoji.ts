import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement('avatar-with-emoji')
class AvatarWithEmoji extends LitElement {

  static get styles() {
    return css`
      .container {
        position: relative;
      }

      .emoji {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% + 31%));
        z-index: 1;
        line-height: 1;
        top: 0;
      }
    `;
  }

  @property({type: String})
  emoji?: string;

  @property({ type: Array })
  dimensions: { width: number, height: number } | null = null;

  observeSize = () => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.dimensions = { width, height };
      }
    });
    resizeObserver.observe(this);
  }

  firstUpdated() {
    this.observeSize();
  }

  render() {
    return html`
      <div class="container">
        ${this.renderEmoji()}
        <slot></slot>
      </div>
    `;
  }

  renderEmoji() {
    if (!this.dimensions) {
      return null;
    }

    const { width: containerWidth } = this.dimensions;
    const fontSize = Math.floor(containerWidth * 0.5);

    return html`
      <span class="emoji" style="font-size: ${fontSize}px">${this.emoji}</span>
    `;
  }

}
