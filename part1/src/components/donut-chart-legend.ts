import { LitElement, html, customElement, property, css } from 'lit-element';

type Data = {
  label: string;
  value: string;
  diff: string;
}[];

@customElement('donut-chart-legend')
class DonutChartLegend extends LitElement {

  static get styles() {
    return css`    
      .legend-item {
        display: flex;
        align-items: center;
      }

      :host([orientation=portrait]) .legend-item {
        height: 7.5vh;
      }
      :host([orientation=landscape]) .legend-item {
        height: 13.3vh;
      }

      :host([theme=light]) .legend-item:not(:first-child) {
        border-top: 2px solid rgba(191, 191, 191, 0.3);
      }

      :host([theme=dark]) .legend-item:not(:first-child) {
        border-top: 2px solid rgba(145, 143, 138, 0.3);
      }

      .color-dot {
        width: 16px;
        height: 16px;
        background: pink;
        border-radius: 50%;
        margin-right: 0.6rem;
      }

      :host([theme=dark]) .color-dot_0 {
        background: radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 0, 0.8) 0%, rgba(91, 66, 0, 0.8) 100%);
        box-shadow: 0px 0px 20px -8px rgba(247, 178, 1, 0.2), inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 12px rgba(255, 184, 0, 0.9);
      }
      :host([theme=light]) .color-dot_0 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(255, 184, 0, 0.56) 81.25%, rgba(255, 239, 153, 0.32) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.9);
      }
      :host([theme=dark]) .color-dot_1 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(99, 63, 0, 0.5) 72.92%, rgba(15, 9, 0, 0.5) 100%);
        box-shadow: 0px 0px 20px -8px rgba(147, 93, 0, 0.2), inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(202, 129, 0, 0.9);
      }
      :host([theme=light]) .color-dot_1 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(255, 184, 0, 0.24) 81.25%, rgba(255, 239, 153, 0.12) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);
      }
      :host([theme=dark]) .color-dot_2 {
        background: radial-gradient(100% 100% at 50% 0%, rgba(151, 151, 151, 0.5) 0%, rgba(41, 41, 41, 0.5) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5);
      }
      :host([theme=light]) .color-dot_2 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(166, 166, 166, 0.1725) 82.81%, rgba(203, 203, 203, 0.05) 92.19%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(105, 105, 105, 0.2);
      }
      :host([theme=dark]) .color-dot_3 {
        background: radial-gradient(100% 100% at 50% 0%, rgba(62, 62, 62, 0.5) 0%, rgba(40, 40, 40, 0.5) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5);
      }
      :host([theme=light]) .color-dot_3 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(191, 191, 191, 0.345) 82.81%, rgba(228, 228, 228, 0.1) 92.19%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(131, 131, 131, 0.6);
      }

      .label {
        color: var(--body-color);
        flex-grow: 1;
        font-size: 4.25vh;
      }

      :host([orientation=portrait]) .label, :host([orientation=portrait]) .diff, :host([orientation=portrait]) .value {
        font-size: 2.4vh;
      }
      :host([orientation=landscape]) .label, :host([orientation=landscape]) .diff, :host([orientation=landscape]) .value {
        font-size: 4.25vh;
      }

      .diff {
        margin-right: 1rem;
      }

      .diff, .value {
        color: var(--body-grey-color);
      }
    `;
  }

  @property({ type: Array })
  data!: Data;

  render() {
    
    return this.data.map((item, index) => html`
      <div class="legend-item">
        <div class="color-dot color-dot_${index}"></div>
        <div class="label">${item.label}</div>
        <div class="diff">${item.diff}</div>
        <div class="value">${item.value}</div>
      </div>
    `);
    // console.log('this.data', this.data);
    // return null;
  }

}
