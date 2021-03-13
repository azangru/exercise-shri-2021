import { html, customElement, property, css } from 'lit-element';

import { BaseSlide } from './base-slide';

import '../components/sprints-chart';
import '../components/person-in-sprints-chart';
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
      :host {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
        padding: 0 24px;
      }

      .title-area {
        height: 100px;
      }

      .main {
        align-self: end;
        height: 100%;
      }

      sprints-chart {
        height: 63%;
      }
    `;
  }

  @property({ type: Object })
  data!: SlideData

  render() {
    return html`
      <div class="title-area">
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
          orientation="${this.orientation}"
        ></slide-title>
      </div>
      <div class="main">
        <sprints-chart
          theme=${this.theme}
          orientation=${this.orientation}
          .data=${this.data.values}
        ></sprints-chart>
        <div>
          ${this.data.users.map(user => html`
            <person-in-sprints-chart
              .data=${user}
              theme=${this.theme}
            ></person-in-sprints-chart>
          `)}
        </div>
      </div>
    `;
  }

}
