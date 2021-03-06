import { html, customElement, property, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames';

import { BaseSlide } from './base-slide';
import { resetStyles } from '../styles/reset';

import '../components/person-leader';

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
          grid-template-rows: [title] auto [main] 1fr;
        }
        .title-area {
          height: 100px;
        }

        .stage {
          position: relative;
        }

        .podium-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          bottom: 0;
          width: 120px;
        }

        .podium-column {
          position: relative;          
          border-radius: 6px 6px 0 0;
          width: 100%;
        }

        .slide_dark .podium-column {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) -2.22%, rgba(0, 0, 0, 0.8) 100%),
            radial-gradient(149.08% 95.38% at 38.75% 71.48%, #000000 0%, #231900 0.01%, #4D4D4D 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6);
        }

        .slide_dark .podium-column_1 {
          background: radial-gradient(91.67% 122.17% at 69.17% -11.17%, #FFA300 0%, #2D1C00 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.4);
        }

        .slide_light .podium-column {
          background: linear-gradient(180deg, rgba(244, 244, 244, 0.9) 0.82%, #E9E9E9 100%, rgba(234, 234, 234, 0) 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(207, 207, 207, 0.5);
        }

        .slide_light .podium-column_1 {
          background: linear-gradient(180deg, #FFF2D1 0.82%, #FFD66C 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.8);
        }

        .podium-column_1.podium-column_portrait {
          height: 48vh;
          z-index: 2
        }
        .podium-column_2.podium-column_portrait {
          height: 41vh;
          z-index: 1
        }
        .podium-column_3.podium-column_portrait {
          height: 34vh;
        }

        .podium-column_1.podium-column_landscape {
          height: 29vh;
          z-index: 2
        }
        .podium-column_2.podium-column_landscape,
        .podium-column_3.podium-column_landscape {
          height: 23.5vh;
          z-index: 1
        }
        .podium-column_4.podium-column_landscape,
        .podium-column_5.podium-column_landscape {
          height: 18vh;
        }

        .podium-section_2.podium-section_portrait person-leader,
        .podium-section_2.podium-section_landscape person-leader,
        .podium-section_4.podium-section_landscape person-leader {
          margin-left: 16px;
        }

        .podium-section_3.podium-section_portrait person-leader,
        .podium-section_3.podium-section_landscape person-leader,
        .podium-section_5.podium-section_landscape person-leader {
          margin-right: 16px;
        }

        .podium-column-place-number {
          position: absolute;
          top: 4%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 30px;
        }
        .podium-column_landscape .podium-column-place-number {
          top: 5vh;
        }
        .slide_dark .podium-column-place-number {
          color: white;
        }
        .podium-section_2.podium-section_portrait .podium-column-place-number,
        .podium-section_2.podium-section_landscape .podium-column-place-number,
        .podium-section_4.podium-section_landscape .podium-column-place-number {
          transform: translateX(calc(-50% + 8px));
          // margin-left: 16px;
        }
        .podium-section_3.podium-section_portrait .podium-column-place-number,
        .podium-section_3.podium-section_landscape .podium-column-place-number,
        .podium-section_5.podium-section_landscape .podium-column-place-number {
          transform: translateX(calc(-50% - 4px));
          // margin-right: 16px;
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
        <div class="title-area">
        </div>
        <div class="stage">
          ${this.renderpodium()}
        </div>
      </div>
    `;
  }

}
