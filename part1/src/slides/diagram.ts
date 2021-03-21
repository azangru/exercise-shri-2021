import { html, customElement, property, css } from 'lit-element';

import { BaseSlide } from './base-slide';

import '../components/donut-chart';
import '../components/slide-title';

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
      }

      .slide {
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

      .slide_portrait donut-chart {
        width: calc(100vw - 2 * 24px);
        max-width: 50vh;
      }

      .slide_landscape donut-chart {
        width: 64vh;
      }
    `;
  }

  @property({ type: Object })
  data!: SlideData

  prepareChartData() {
    const regex = /(\d+)/;
    return this.data.categories.map(({ valueText }) => {
      const match = regex.exec(valueText) as RegExpMatchArray;
      return parseInt(match[1], 10);
    });
  }

  render() {
    return html`
      <div class="slide slide_${this.orientation}">
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
          orientation="${this.orientation}"
        ></slide-title>
        <div class="chart-wrapper">
          <donut-chart
            .primaryText=${this.data.totalText}
            .secondaryText=${this.data.differenceText}
            .data=${this.prepareChartData()}
            theme=${this.theme}
            orientation=${this.orientation}
          ></donut-chart>
        </div>
      </div>
    `;
  }
  
}
