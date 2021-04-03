import { html, customElement, property, css } from 'lit-element';
import classNames from 'classnames';

import { BaseSlide } from './base-slide';

import '../components/slide-title';
import '../components/people-vote';
import '../components/pager-vote';

import { Person } from '../types/person';

type SlideData = {
  title: string;
  subtitle: string;
  emoji: string;
  selectedUserId?: number;
  offset?: number; // index of the person from the users array to be displayed first
  users: Person[];
};

@customElement('slide-vote')
class SlideVote extends BaseSlide {

  static get styles() {
    return css`
      .slide {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
      }

      .slide_portrait {
        padding: 0 6.4vw;
      }

      main {
        display: flex;
      }

      .slide_portrait main {
        justify-content: space-between;
      }

      .slide_landscape main {
        justify-content: space-evenly;
      }

      .slide_landscape people-vote {
        flex-grow: 1;
      }
    `
  }

  @property({ type: Object })
  data!: SlideData

  @property({ type: Number })
  offset: number = 0;

  @property({ type: Object })
  stageDimensions: { width: number, height: number } | null = null;

  connectedCallback() {
    super.connectedCallback();

    if (this.data.offset) {
      this.offset = this.data.offset;
    }
  }

  observeSize = () => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.stageDimensions = { width, height };
      }
    });
    resizeObserver.observe(this.shadowRoot?.querySelector('main') as HTMLElement);
  }

  firstUpdated() {
    this.observeSize();
  }

  render() {
    const slideClasses = classNames(
      'slide',
      `slide_${this.orientation}`
    );
    return html`
      <div class=${slideClasses}>
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
          orientation="${this.orientation}"
        ></slide-title>
        <main>
          ${
            this.orientation === 'portrait'
              ? this.renderPortrait()
              : this.renderLandscape()
          }
        </main>
      </div>
    `;
  }

  /**
   * Notice:
   * - eight people per view
   * - three groups of people:
   *    - one to the left of the pager (three people)
   *    - one inside the pager (two people)
   *    - one to the right of the pager (three people)
   * - equal distances between people elements vertically
   */
  renderPortrait() {
    if (!this.stageDimensions) {
      return null;
    }
    const people = this.data.users.slice(this.offset, this.offset + 8);
    const firstGroup = people.slice(0, 3);
    const secondGroup = people.slice(3, 5);
    const thirdGroup = people.slice(5);
    return html`
      ${this.renderPeoplePortrait(firstGroup)}
      <pager-vote
        .buttonDiameter=${this.calculatePagerButtonDiameter()}
        .currentOffset=${this.offset}
        .total=${this.data.users.length}
        theme=${this.theme}
        orientation=${this.orientation}
      >
        ${this.renderPeoplePortrait(secondGroup)}
      </pager-vote>
      ${this.renderPeoplePortrait(thirdGroup)}
    `;
  }

  /**
   * Notice:
   * - six people per view
   * - two groups of people: one to the left of the pager and one to the right
   * - equal distances between people elements horizontally
   */
  renderLandscape() {
    if (!this.stageDimensions) {
      return null;
    }
    const people = this.data.users.slice(this.offset, this.offset + 6);
    const firstGroup = [
      people[0],
      people[1],
      people[4]
    ].filter(Boolean);
    const secondGroup = [
      people[2],
      people[5],
      people[3]
    ].filter(Boolean);

    return html`
      ${this.renderPeopleLandscape(firstGroup, 'left')}
      <pager-vote
        .buttonDiameter=${this.calculatePagerButtonDiameter()}
        .currentOffset=${this.offset}
        .total=${this.data.users.length}
        theme=${this.theme}
        orientation=${this.orientation}
      >
      </pager-vote>
      ${this.renderPeopleLandscape(secondGroup, 'right')}
    `;
  }

  renderPeoplePortrait(people: Person[]) {
    return html`
      <people-vote
        .people=${people}
        .personSize=${this.calculatePersonSize()}
        theme=${this.theme}
        orientation=${this.orientation}
      ></people-vote>
    `;
  }

  renderPeopleLandscape(people: Person[], position: 'left' | 'right') {
    return html`
      <people-vote
        .people=${people}
        .personSize=${this.calculatePersonSize()}
        theme=${this.theme}
        orientation=${this.orientation}
        position=${position}
      ></people-vote>
    `;
  }

  calculatePersonSize() {
    const { width: viewportWidth, height: viewportHeight } = this.getBoundingClientRect();
    const minDimension = Math.min(viewportWidth, viewportHeight);
    const containerWidth = this.stageDimensions?.width as number;
    const containerHeight = this.stageDimensions?.height as number;

    let height: number, width: number;
    if (this.orientation === 'portrait') {
      const maxWidth = Math.round(minDimension * 0.28);
      const maxHeight = containerHeight / 3.2;
      const potentialWidth = Math.min(
        Math.round(containerWidth * 0.317),
        maxWidth
      );
      const potentialHeight = potentialWidth * 1.365;
      if (potentialHeight <= maxHeight) {
        width = Math.round(potentialWidth);
        height = Math.round(potentialHeight);
      } else {
        height = Math.round(maxHeight);
        width = Math.round(maxHeight / 1.365);
      }
      height = Math.round(width * 1.365);
    } else {
      const maxHeight = Math.round(minDimension * 0.32);
      height = Math.min(
        Math.round(containerHeight * 0.4765),
        maxHeight
      );
      width = Math.round(height / 1.365);
    }
    return { width, height };
  }

  calculatePagerButtonDiameter() {
    const { width: personWidth } = this.calculatePersonSize();
    let diameter = personWidth * 0.615;

    if (this.orientation === 'landscape') {
      diameter = Math.min(
        diameter,
        window.innerWidth - personWidth * 4.05
      );
    }
    return Math.round(diameter);
  }
  
}
