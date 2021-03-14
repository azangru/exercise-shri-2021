import { LitElement, html, css, customElement, property } from 'lit-element';
import classNames from 'classnames';

import './person-in-sprints-chart';

import { Person } from '../types/person';

@customElement('people-in-sprints-chart')
class PeopleInSprintsChart extends LitElement {

  static get styles() {
    return css`
      .people_portrait {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      }

      .people_landscape {
        display: flex;
      }

      .person-container_portrait {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
      }

      .person-container_portrait + .person-container_portrait {
        border-top: 2px solid rgba(145, 143, 138, 0.3); // var(--body-grey-color);
      }

      .person-container_landscape {
        flex: 1 0 auto;
        display: flex;
        justify-content: center;
      }

      .person-container_landscape:first-child {
        border-right: 1px solid rgba(145, 143, 138, 0.3); // var(--body-grey-color);
      }
    `
  }

  @property({ type: Array })
  data!: Person[];

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  @property({ type: Array })
  height: number | null = null;

  observeSize = () => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.height = height;
      }
    });
    resizeObserver.observe(this);
  }

  firstUpdated() {
    this.observeSize();
  }

  render() {
    return this.orientation === 'portrait'
      ? this.renderPortrait()
      : this.renderLandscape();
  }

  renderPortrait() {
    if (!this.height) {
      return null;
    }

    const peopleCount = this.getPeopleCount();
    const people = this.data.slice(0, peopleCount);
    return this.renderPeople(people, this.orientation);
  }

  renderLandscape() {
    const people = this.data.slice(0, 2);
    return this.renderPeople(people, this.orientation);
  }

  renderPeople(people: Person[], orientation: string) {
    return html`
      <div class="people people_${orientation}">
        ${
          people.map(person => html`
            <div class="person-container_${orientation}">
              <person-in-sprints-chart
                class="person_${orientation}"
                .data=${person}
                theme=${this.theme}
              ></person-in-sprints-chart>
            </div>
          `)
        }
      </div>
    `;
  }

  // for portrait orientation: choose to show either 2 or 3 people depending on the available space
  getPeopleCount() {
    const minPadding = 10;
    const personBlockMinHeight = 40;
    return this.height as number > (personBlockMinHeight + 2 * minPadding) * 3
      ? 3 : 2;
  }

}
