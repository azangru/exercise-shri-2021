import { LitElement, html, customElement, property, css } from 'lit-element';
import { arc as d3ArcFactory } from 'd3-shape';

type Angles = {
  startAngle: number,
  endAngle: number
};

@customElement('donut-chart')
class DonutChart extends LitElement {

  static get styles() {
    return css`
    `;
  }

  private innerRadius = 115
  private outerRadius = 164

  @property({ type: String })
  primaryText!: string;

  @property({ type: String })
  secondaryText!: string;

  // four numbers, sorted: correspond to bright-yellow, dull-yellow, light-grey, and dark-grey
  // sections of the chart
  @property({ type: Array })
  data!: number[];

  getAngles() {
    const total = this.data.reduce((sum, number) => sum + number);
    const tau = 2 * Math.PI;

    return this.data
      .map(number => number / total * tau)
      .reduce(( acc, value, index ): Angles[] => {
        console.log(acc);
        const startAngle = index === 0
          ? 0 - value / 2
          : acc[acc.length - 1].endAngle;
        const endAngle = startAngle + value;

        return acc.concat({
          startAngle,
          endAngle
        });
      }, [] as Angles[]);
  }

  getSectors() {
    return this.getAngles().map((angles) => this.getArc(angles));
  }

  getArc(angles: Angles) {
    const { startAngle, endAngle } = angles;
    const arc = d3ArcFactory();
    arc.padAngle(Math.PI * 0.004);
    arc.cornerRadius(5);

    return arc({
      innerRadius: this.innerRadius,
      outerRadius: this.outerRadius,
      startAngle,
      endAngle
    });
  }

  render() {
    const [sector1, sector2, sector3, sector4] = this.getSectors();

    return html`
      <svg viewbox="0 0 328 328">
        <defs>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad1">
            <stop offset="0%" stop-color="rgba(255, 163, 0, 0.8)"></stop>
            <stop offset="65%" stop-color="rgba(91, 58, 0, 0.8)"></stop>
            <stop offset="70%" stop-color="rgba(91, 58, 0, 0.8)"></stop>
            <stop offset="100%" stop-color="rgba(255, 163, 0, 0.8)"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad2">
            <stop offset="0%" stop-color="rgba(99, 63, 0, 0.5)"></stop>
            <stop offset="65%" stop-color="rgba(15, 9, 0, 0.5)"></stop>
            <stop offset="70%" stop-color="rgba(15, 9, 0, 0.5)"></stop>
            <stop offset="100%" stop-color="rgba(99, 63, 0, 0.5)"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad3">
            <stop offset="0%" stop-color="rgba(155, 155, 155, 0.5)"></stop>
            <stop offset="65%" stop-color="rgba(56, 41, 0, 0.5)"></stop>
            <stop offset="70%" stop-color="rgba(56, 41, 0, 0.5)"></stop>
            <stop offset="100%" stop-color="rgba(155, 155, 155, 0.5)"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad4">
            <stop offset="0%" stop-color="rgba(77, 77, 77, 0.5)"></stop>
            <stop offset="65%" stop-color="rgba(56, 41, 0, 0.5)"></stop>
            <stop offset="70%" stop-color="rgba(56, 41, 0, 0.5)"></stop>
            <stop offset="100%" stop-color="rgba(77, 77, 77, 0.5)"></stop>
          </radialGradient>
        </defs>
        <g transform="translate(164,164)">
          <path d=${sector1} fill="url(#grad1)"></path>
          <path d=${sector2} fill="url(#grad2)"></path>
          <path d=${sector3} fill="url(#grad3)"></path>
          <path d=${sector4} fill="url(#grad4)"></path>
        </g>
      </svg>
    `;
  }
  
}

