import { html, customElement, property, css } from 'lit-element';
import { arc as d3ArcFactory } from 'd3-shape';

import { BaseSlide } from './base-slide';

import '../components/donut-chart';

// test with slide 9

type SlideData = {
  title: string;
  subtitle: string;
  totalText: string;
  differenceText: string;
  categories: Array<{
    title: string;
    valueText: string;
    differenceText: string;
  }>;
};


@customElement('slide-diagram')
class SlideDiagram extends BaseSlide {

  static get styles() {
    return css`
      :host {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
        padding: 0 24px;
      }

      .chart-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      donut-chart {
        width: 328px;
        height: 328px;
      }
    `;
  }

  @property({ type: Object })
  data!: SlideData

  getArc() {
    const arc = d3ArcFactory();
    return arc({
      innerRadius: 230 / 2,
      outerRadius: 328 / 2,
      startAngle: -(Math.PI),
      endAngle: Math.PI / 2
    });
  }

  prepareChartData() {
    const regex = /(\d+)/;
    return this.data.categories.map(({ valueText }) => {
      const match = regex.exec(valueText) as RegExpMatchArray;
      return parseInt(match[1], 10);
    });
  }

  render() {
    return html`
      <div>
        Title
      </div>
      <div class="chart-wrapper">
        <donut-chart
          .primaryText=${this.data.totalText}
          .secondaryText=${this.data.differenceText}
          .data=${this.prepareChartData()}
        ></donut-chart>
      </div>
    `;
  }
  
}
