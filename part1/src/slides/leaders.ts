import { html, customElement, property, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames';

import { BaseSlide } from './base-slide';
import { resetStyles } from '../styles/reset';

import '../components/person-leader';
import '../components/slide-title';
import '../components/leaders-podium';

import { Person } from '../types/person';

type SlideData = {
  title: string;
  subtitle: string;
  emoji: string;
  users: Person[]
};

@customElement('slide-leaders')
class SlideLeaders extends BaseSlide {

  static get styles() {
    return [
      resetStyles,
      css`
        .slide {
          height: 100%;
          display: grid;
          grid-template-rows: [title] 17% [main] 1fr;
        }

        @media  (orientation: portrait) {
          .slide {
            grid-template-rows: [title] minmax(17%, auto) [main] 1fr;
          }

          .slide {
            padding: 0 6.4vw;
          }
        }

        @media  (orientation: landscape) {
          .slide {
            grid-template-rows: [title] minmax(28%, auto) [main] 1fr;
          }
        }

        .stage {
          height: 100%;
          position: relative;
        }
      `
    ];
  }

  @property({type: Object})
  data!: SlideData;

  private getTopLeaderId() {
    // users in the data.users array seem to have already been ranked
    return this.data.users[0].id;
  }

  renderpodium() {
    const maxIndex = this.orientation === 'portrait' ? 3 : 5;
    const users = this.data.users.slice(0, maxIndex);
    const rearrangedUsers: {rank: number, person: Person }[] = [];
    users.forEach((user, index) => {
      const data = {
        rank: index + 1,
        person: user
      };
      if (index % 2 == 0) {
        rearrangedUsers.unshift(data);
      } else {
        rearrangedUsers.push(data);
      }
    });

    const topLeaderId = this.getTopLeaderId();

    return rearrangedUsers.map(({ rank, person }, index) => {
      const sectionClasses = classNames(
        'podium-section',
        `podium-section_${rank}`,
        `podium-section_${this.orientation}`
      );
      const columnClasses = classNames(
        'podium-column',
        `podium-column_${rank}`,
        `podium-column_${this.orientation}`,
        {'podium-column_top': person.id === topLeaderId }
      );

      return html`
        <div class="${sectionClasses}" style="left: ${this.calculateColumnPosition(index, rearrangedUsers.length)}">
          <person-leader
            .data=${person}
            theme=${this.theme}
            emoji=${ifDefined(person.id === topLeaderId ? this.data.emoji : undefined)}
          ></person-leader>
          <div class=${columnClasses}>
            <div class="podium-column-place-number">
              ${rank}
            </div>
          </div>
        </div>
      `
    });
  }

  calculateColumnPosition = (index: number, columnsCount: number) => {
    const columnWidth = 120; // FIXME: adaptive
    const overlapWidth = 16;

    const midIndex = Math.floor(columnsCount / 2);
    let left;
    if (index === midIndex) {
      left = `calc(50% - ${columnWidth / 2}px)`;
    } else {
      const multiplier = index - midIndex;
      const shiftForOverlap = -1 * multiplier * overlapWidth;
      left = `calc(50% + ${multiplier * columnWidth}px + ${shiftForOverlap}px - ${columnWidth / 2}px)`;
    }
    return left;
  }

  render() {
    return html`
      <div class="slide slide_${this.theme}">
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
        ></slide-title>
        <div class="stage">
          <leaders-podium
            .emoji=${this.data.emoji}
            .people=${this.data.users}
            theme=${this.theme}
            orientation=${this.orientation}
          ></leaders-podium>
        </div>
      </div>
    `;
  }

}
