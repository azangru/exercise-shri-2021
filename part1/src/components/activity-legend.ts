import { LitElement, html, customElement, property, css } from 'lit-element';

@customElement('activity-legend')
class ActtivityLegend extends LitElement {

  static get styles() {
    return css`
      .scale {
        position: relative;
        width: 51px;
        height: 4px;
      }

      .scale::before, .scale::after {
        content: '';
        position: absolute;
        top: 0;
        width: 4px;
        height: 12px;
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
    `;
  }

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  render() {
    return this.renderScale();
  }

  renderScale() {
    return html`
      <div class="scale scale_${this.theme}"></div>
    `;
  }

}
