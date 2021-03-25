import { LitElement, html, customElement, property, css } from 'lit-element';

@customElement('activity-legend')
class ActtivityLegend extends LitElement {

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
      }

      .scale-wrapper {
        height: 3.2vw;
        display: flex;
        align-items: center;
      }

      .scale {
        position: relative;
        width: 13.6vw;
        height: 1vw;
      }

      @media (orientation: portrait) {
        .scale {
          width: 13.6vw;
          height: 1vw;
        }

        .scale::before, .scale::after {
          width: 1vw;
          height: 3.2vw;
        }
      }

      @media (orientation: landscape) {
        .scale {
          width: 13.6vh;
          height: 1vh;
        }

        .scale::before, .scale::after {
          width: 1vh;
          height: 3.2vh;
        }
      }

      .scale::before, .scale::after {
        content: '';
        position: absolute;
        top: 0;
        border-radius: 2px;     
      }

      .scale::before {
        left: 0;
        transform: translate(-100%, -33%);
      }
      
      .scale::after {
        right: 0;
        transform: translate(100%, -33%);
      }

      .scale_dark {
        background: radial-gradient(circle at 50% 50%, #403B36 0%, #131211 100%);
        box-shadow: inset 3px 1px 16px 0px #70665E,inset 0px -1px 2px 0px #FFFFFF;
      }

      .scale_light {
        background: radial-gradient(circle at 50% 50%, #FFFFFF 0%, #FFFFFF 100%);
        box-shadow: inset 1px 1px 16px 0px #676767,inset -1px 0px 2px 0px #FFFFFF;
      }

      .scale_dark::before, .scale_dark::after {
        background: radial-gradient(circle at 50% 50%, #403B36 0%, #000000 100%);
        box-shadow: inset 3px 1px 16px 0px #70665E,inset 0px -1px 2px 0px #FFFFFF;
      }

      .label-text {
        color: var(--body-grey-color);
        margin-top: 0.5em;
      }

      .label-wrapper:not(:first-child) {
        margin-left: 2vw;
      }

      .indicator {
        border-radius: 2px;
      }

      @media (orientation: portrait) {
        .indicator {
          width: 15.7vw;
          height: 3.2vw;
        }
      }

      @media (orientation: landscape) {
        .indicator {
          width: 15.7vh;
          height: 3.2vh;
        }
      }

      .indicator-lowest_dark {
        background: radial-gradient(3906.1% 3815.36% at 89.06% 78.28%, rgba(19, 17, 16, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%);
        box-shadow: inset -1px 0px 2px rgba(255, 255, 255, 0.2), inset 1px 1px 16px rgba(112, 102, 94, 0.2);
      }

      .indicator-lowest_light {
        background: radial-gradient(2408.25% 2730.55% at 89.06% 78.28%, rgba(250, 250, 250, 0.6) 0%, rgba(250, 250, 250, 0.6) 100%);
        box-shadow: inset -1px 0px 2px rgba(250, 250, 250, 0.2), inset 1px 1px 16px rgba(106, 106, 106, 0.2);
      }

      .indicator-low_dark {
        background: radial-gradient(5752.25% 5190.32% at 74.43% 60.32%, rgba(0, 0, 0, 0.9) 0%, rgba(35, 22, 0, 0.9) 0.01%, rgba(112, 92, 94, 0.9) 100%);
        box-shadow: inset -1px 0px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(93, 116, 141, 0.6);
      }

      .indicator-low_light {
        radial-gradient(2408.25% 2730.55% at 89.06% 78.28%, rgba(250, 250, 250, 0.8) 0%, rgba(250, 250, 250, 0.8) 100%);
        box-shadow: inset -1px 0px 2px rgba(250, 250, 250, 0.2), inset 1px 1px 16px rgba(106, 106, 106, 0.3);
      }

      .indicator-mid_dark {
        background: radial-gradient(5528.36% 3005.63% at 74.43% 75.84%, rgba(0, 0, 0, 0.9) 0%, rgba(33, 22, 2, 0.9) 0.01%, rgba(172, 113, 9, 0.9) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(242, 159, 13, 0.2);
      }

      .indicator-mid_light {
        background: radial-gradient(68.1% 68.1% at 4.41% 31.9%, #FFF6DD 8.72%, #FFFEFA 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);
      }

      .indicator-high_dark {
        background: radial-gradient(2258.03% 620.37% at 83.33% 88.95%, #201502 0%, #C7830A 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(242, 159, 13, 0.9);
      }

      .indicator-high_light {
        background: radial-gradient(66.02% 86.49% at -16.18% 13.51%, rgba(255, 186, 6, 0.85) 0%, #FFF2AD 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);
      }
    `;
  }

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  render() {
    return html`
      ${this.renderScale()}
      ${this.renderLowest()}
      ${this.renderLow()}
      ${this.renderMid()}
      ${this.renderHigh()}
    `;
  }

  renderScale() {
    return html`
      <div class="label-wrapper">
        <div class="scale-wrapper">
          <div class="scale scale_${this.theme}"></div>
        </div>
        <div class="label-text">1 час</div>
      </div>
    `;
  }

  renderLowest() {
    return html`
      <div class="label-wrapper">
        <div class="indicator indicator-lowest_${this.theme}"></div>
        <div class="label-text">0</div>
      </div>
    `;
  }

  renderLow() {
    return html`
      <div class="label-wrapper">
        <div class="indicator indicator-low_${this.theme}"></div>
        <div class="label-text">1 — 2</div>
      </div>
    `;
  }

  renderMid() {
    return html`
      <div class="label-wrapper">
        <div class="indicator indicator-mid_${this.theme}"></div>
        <div class="label-text">3 — 4</div>
      </div>
    `;
  }

  renderHigh() {
    return html`
      <div class="label-wrapper">
        <div class="indicator indicator-high_${this.theme}"></div>
        <div class="label-text">5 — 6</div>
      </div>
    `;
  }

}
