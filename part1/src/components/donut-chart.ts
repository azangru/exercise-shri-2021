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
      :host {
        position: relative;
      }

      .chart-text {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      .text-primary {
        font-size: 30px;
        line-height: 32px;
        color: var(--body-color);
      }

      .text-secondary {
        font-size: 20px;
        line-height: 22px;
        color: var(--body-grey-color);
        margin-top: 0.4em;
      }
    `;
  }

  private colors = {
    dark: {
      grad1: [
        'rgba(255, 163, 0, 0.8)',
        'rgba(91, 58, 0, 0.8)'
      ],
      grad2: [
        'rgba(99, 63, 0, 0.5)',
        'rgba(15, 9, 0, 0.5)'
      ],
      grad3: [
        'rgba(155, 155, 155, 0.5)',
        'rgba(56, 41, 0, 0.5)'
      ],
      grad4: [
        'rgba(77, 77, 77, 0.5)',
        'rgba(56, 41, 0, 0.5)'
      ]
    },
    light: {
      grad1: [
        // 'rgba(255, 184, 0, 0.56)',
        // 'rgba(255, 239, 153, 0.32)'
        'rgba(255, 184, 0, 0.7)',
        'rgba(255, 239, 153, 0.5)'
      ],
      grad2: [
        // 'rgba(255, 184, 0, 0.24)',
        // 'rgba(255, 239, 153, 0.12)'
        'rgba(255, 184, 0, 0.5)',
        'rgba(255, 239, 153, 0.25)'
      ],
      grad3: [
        // 'rgba(166, 166, 166, 0.1725)',
        // 'rgba(203, 203, 203, 0.05)'
        'rgba(166, 166, 166, 0.4)',
        'rgba(203, 203, 203, 0.1)'
      ],
      grad4: [
        // 'rgba(191, 191, 191, 0.345)',
        // 'rgba(228, 228, 228, 0.1)'
        'rgba(191, 191, 191, 0.6)',
        'rgba(228, 228, 228, 0.3)'
      ]
    }
  }

  get outerRadius() {
    if (this.dimensions?.width) {
      return this.dimensions?.width / 2;
    } else {
      return null;
    }
  }

  get innerRadius() {
    if (this.outerRadius) {
      return this.outerRadius * 0.7;
    } else {
      return null;
    }
  }

  @property({ type: String })
  primaryText!: string;

  @property({ type: String })
  secondaryText!: string;

  @property({ type: String })
  theme!: 'dark' | 'light';

  // four numbers, sorted: correspond to bright-yellow, dull-yellow, light-grey, and dark-grey
  // sections of the chart
  @property({ type: Array })
  data!: number[];

  @property({ type: Object })
  dimensions: { height: number; width: number } | null = null;

  observeSize = () => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const height = width;
        this.dimensions = { width, height };
      }
    });
    resizeObserver.observe(this);
  }

  firstUpdated() {
    this.observeSize();
  }

  getAngles() {
    const total = this.data.reduce((sum, number) => sum + number);
    const tau = 2 * Math.PI;

    return this.data
      .map(number => number / total * tau)
      .reduce(( acc, value, index ): Angles[] => {
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
    if (!this.innerRadius || !this.outerRadius) {
      return null;
    }

    const { startAngle, endAngle } = angles;
    const arc = d3ArcFactory();
    arc.padAngle(Math.PI * 0.004);
    arc.cornerRadius(5);

    console.log('this.outerRadius', this.outerRadius);

    return arc({
      innerRadius: this.innerRadius,
      outerRadius: this.outerRadius,
      startAngle,
      endAngle
    });
  }

  render() {
    if (!this.dimensions || !this.innerRadius || !this.outerRadius) {
      return null;
    }
    const [sector1, sector2, sector3, sector4] = this.getSectors();

    const colors = this.colors[this.theme];

    return html`
      <svg width=${this.dimensions.width} height=${this.dimensions.height} viewbox="0 0 ${this.dimensions.width} ${this.dimensions.height}">
        <defs>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad1">
            <stop offset="0%" stop-color="${colors.grad1[0]}"></stop>
            <stop offset="65%" stop-color="${colors.grad1[1]}"></stop>
            <stop offset="70%" stop-color="${colors.grad1[1]}"></stop>
            <stop offset="100%" stop-color="${colors.grad1[0]}"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad2">
            <stop offset="0%" stop-color="${colors.grad2[0]}"></stop>
            <stop offset="65%" stop-color="${colors.grad2[1]}"></stop>
            <stop offset="70%" stop-color="${colors.grad2[1]}"></stop>
            <stop offset="100%" stop-color="${colors.grad2[0]}"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad3">
            <stop offset="0%" stop-color="${colors.grad3[0]}"></stop>
            <stop offset="65%" stop-color="${colors.grad3[1]}"></stop>
            <stop offset="70%" stop-color="${colors.grad3[1]}"></stop>
            <stop offset="100%" stop-color="${colors.grad3[0]}"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad4">
            <stop offset="0%" stop-color="${colors.grad4[0]}"></stop>
            <stop offset="65%" stop-color="${colors.grad4[1]}"></stop>
            <stop offset="70%" stop-color="${colors.grad4[1]}"></stop>
            <stop offset="100%" stop-color="${colors.grad4[0]}"></stop>
          </radialGradient>
        </defs>
        <g transform="translate(${this.outerRadius}, ${this.outerRadius})">
          <path d=${sector1} fill="url(#grad1)"></path>
          <path d=${sector2} fill="url(#grad2)"></path>
          <path d=${sector3} fill="url(#grad3)"></path>
          <path d=${sector4} fill="url(#grad4)"></path>
        </g>
      </svg>

      <div class="chart-text" style="max-width: ${this.innerRadius * 2 * 0.8}px">
        <div class="text-primary">
          ${this.primaryText}
        </div>
        <div class="text-secondary">
          ${this.secondaryText}
        </div>
      </div>
    `;
  }
  
}

