import { html, customElement, property, css } from 'lit-element';
import classNames from 'classnames';

import { BaseSlide } from './base-slide';

import '../components/sprints-chart';
import '../components/people-in-sprints-chart';
import '../components/slide-title';

import { Person } from '../types/person';

// test with slide 7

type SlideData = {
  title: string;
  subtitle: string;
  values: Array<{
    title: string;
    value: number;
    active?: true;
  }>;
  users: Person[];
};

@customElement('slide-chart')
class SlideChart extends BaseSlide {

  static get styles() {
    return css`
      .slide {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
        grid-row-gap: 0.6rem;
      }

      .slide_landscape {
        padding: 0 8.6%;
        grid-row-gap: 0;
      }

      .title-area {
        padding: 0 24px;
      }

      .main {
        height: 100%;
      }

      .slide_landscape .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .main-inner-wrapper {
        display: flex;
        flex-direction: column;
        align-self: end;
      }

      .slide_portrait .main-inner-wrapper {
        height: 100%;
      }

      .slide_landscape .main-inner-wrapper {
        height: 80%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
      }

      .slide_portrait sprints-chart {
        flex: 0 0 auto;
        height: 63vh;
      }

      .slide_landscape sprints-chart {
        height: 100%;
      }

      people-in-sprints-chart {
        flex: 1 0 auto;
      }

      .slide_portrait people-in-sprints-chart {
        padding: 0 24px;
      }
    `;
  }

  @property({ type: Object })
  data!: SlideData

  render() {
    const slideClasses = classNames(
      'slide',
      `slide_${this.orientation}`
    );
    return html`
      <div class=${slideClasses}>
        <div class="title-area">
          <slide-title
            title=${this.data.title}
            subtitle=${this.data.subtitle}
            orientation="${this.orientation}"
          ></slide-title>
        </div>
        <div class="main">
          <div class="main-inner-wrapper">
            <sprints-chart
              theme=${this.theme}
              orientation=${this.orientation}
              .data=${this.data.values}
            ></sprints-chart>
            <people-in-sprints-chart
              .data=${this.data.users}
              theme=${this.theme}
              orientation=${this.orientation}
            ></people-in-sprints-chart>
          </div>
        </div>
      </div>
    `;
  }

}
