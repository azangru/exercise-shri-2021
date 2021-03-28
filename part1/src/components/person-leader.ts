import { LitElement, html, css, customElement, property } from 'lit-element';

import './avatar';
import './avatar-with-emoji';

import { Person } from '../types/person';

@customElement('person-leader')
class PersonOnLeadersSlide extends LitElement {

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }

      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .name {
        color: var(--body-color);
        text-align: center;
        line-height: 1.125;
        margin: 6px 0 4px;
      }

      .value {
        color: var(--body-grey-color);
        font-family: var(--font-family-thin);
      }

      x-avatar, avatar-with-emoji {
        width: 61.5%;
      }

      avatar-with-emoji x-avatar {
        width: 100%;
      }
    `;
  }

  @property({type: String})
  theme!: string;

  @property({type: Object})
  data!: Person;

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

  getBottomPadding() {
    const containerHeight = this.dimensions?.height as number;
    return Math.round(containerHeight * 0.123);
  }

  getNameFontSize() {
    const containerWidth = this.dimensions?.width as number; 
    return containerWidth * 0.15;
  }

  getValueFontSize() {
    const containerWidth = this.dimensions?.width as number; 
    return containerWidth * 0.135;
  }

  render() {
    if (!this.dimensions) {
      return null;
    }

    const avatar = html`
      <x-avatar
        name="${this.data.name}"
        file="${this.data.avatar}"
      ></x-avatar>`;

    return html`
      <div class="container" style="padding-bottom: ${this.getBottomPadding()}px">
        ${ this.emoji ?
          html`<avatar-with-emoji emoji="${this.emoji}">${avatar}</avatar-with-emoji>`:
          avatar
        }
        <div class="name" style="font-size: ${this.getNameFontSize()}px">${this.data.name}</div>
        <div class="value" style="font-size: ${this.getValueFontSize()}px">${this.data.valueText}</div>
      </div>
    `;
  }

}
