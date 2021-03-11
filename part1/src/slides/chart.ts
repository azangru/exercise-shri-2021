import { html, customElement, property, css } from 'lit-element';

import { BaseSlide } from './base-slide';

import '../components/sprints-chart';

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

  @property({ type: Object })
  data!: SlideData

  render() {
    return html`
      <sprints-chart
        theme=${this.theme}
        orientation=${this.orientation}
        .data=${this.data.values}
      ></sprints-chart>
    `;
  }

}
