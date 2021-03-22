import { html, customElement, property, css } from 'lit-element';

import { BaseSlide } from './base-slide';

import '../components/slide-title';
import '../components/donut-chart';
import '../components/donut-chart-legend';

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
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
        padding: 0 24px;
      }

      .main_portrait {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .main_landscape {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 6vw;
        height: 100%;
        align-items: center;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
      }

      .slide_portrait donut-chart {
        width: calc(100vw - 2 * 24px);
        max-width: 50vh;
      }

      .slide_landscape donut-chart {
        justify-self: end;
        width: 64vh;
        max-width: 42vw;
      }

      donut-chart-legend {
        width: 100%;
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

  prepareChartLegendData() {
    return this.data.categories.map(item => {
      const value = item.valueText.split(' ').shift();
      const diff = item.differenceText.split(' ').shift();
      return {
        label: item.title,
        value,
        diff
      }
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
        <main class="main_${this.orientation}">
          <donut-chart
            .primaryText=${this.data.totalText}
            .secondaryText=${this.data.differenceText}
            .data=${this.prepareChartData()}
            theme=${this.theme}
            orientation=${this.orientation}
          ></donut-chart>
          <donut-chart-legend
            .data=${this.prepareChartLegendData()}
            theme=${this.theme}
            orientation=${this.orientation}
          ></donut-chart-legend>
        </main>
      </div>
    `;
  }
  
}
