import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames';

type RenderButtonParams = {
  direction: 'up' | 'down';
  isActive: boolean;
  onClick: () => void;
}

@customElement('pager-vote')
class PagerVote extends LitElement {
  
  static get styles() {
    return css`
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
      }

      :host([orientation=landscape]) {
        justify-content: center;
      }

      :host([orientation=landscape]) .button_up {
        transform: translateY(-15%) rotate(180deg);
      }

      :host([orientation=landscape]) .button_down {
        transform: translateY(15%);
      }

      :host([theme=dark]) .button {
        fill: #BFBFBF;
      }

      :host([theme=light]) .button {
        fill: #C4C4C4;
      }

      .button_active {
        cursor: pointer;
      }

      :host([theme=dark]) .button_active {
        fill: var(--color-white);
      }

      :host([theme=light]) .button_active {
        fill: var(--color-yellow);
      }

      .button_up {
        transform: rotate(180deg);
      }

      ::slotted(people-vote) {
        height: 60%;
      }
    `;
  }

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  @property({ type: Number })
  currentOffset!: number;

  @property({ type: Number })
  total!: number;
  
  @property({ type: Number })
  buttonDiameter!: number;

  get perPage() {
    return this.orientation === 'portrait' ? 8 : 6;
  }

  onClick(direction: 'up' | 'down') {
    const perPage = this.perPage;
    const multiplier = direction === 'up' ? -1 : 1;
    const newOffset = this.currentOffset + multiplier * perPage;
    const eventData = {
      alias: 'vote',
      action: 'update',
      params: {
        offset: newOffset
      }
    };

    const event = new CustomEvent('data-event', { 
      detail: eventData,
      bubbles: true, 
      composed: true }
    );
    this.dispatchEvent(event);
  }

  render() {
    return html`
      ${this.renderButton({ direction: 'up', isActive: true, onClick: () => this.onClick('up') })}
      ${this.orientation === 'portrait' ? html`
        <slot></slot>
      ` : null}
      ${this.renderButton({ direction: 'down', isActive: true, onClick: () => this.onClick('down') })}
    `;
  }

  // arrow points down by default
  renderButton(params: RenderButtonParams) {
    const diameter = this.buttonDiameter;
    const isButtonActive = this.isButtonActive(params)
    const buttonClasses = classNames(
      'button',
      `button_${this.theme}`,
      `button_${params.direction}`,
      { 'button_active': isButtonActive },
    );
    return html`
      <svg
        class="${buttonClasses}"
        @click=${ifDefined(isButtonActive ? params.onClick : undefined)}
        width="${diameter}"
        height="${diameter}"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z"
        />
      </svg>
    `;
  }

  isButtonActive(params: RenderButtonParams) {
    if (params.direction === 'up') {
      return this.currentOffset > 0;
    } else {
      const perPage = this.orientation === 'portrait' ? 8 : 6;
      return this.total > this.currentOffset + perPage;
    }
  }

}
