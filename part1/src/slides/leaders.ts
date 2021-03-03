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
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        .pedestal-column {
          border-radius: 6px 6px 0 0;
        }

        .slide_dark .pedestal-column {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) -2.22%, rgba(0, 0, 0, 0.8) 100%),
            radial-gradient(149.08% 95.38% at 38.75% 71.48%, #000000 0%, #231900 0.01%, #4D4D4D 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6);
        }

        .slide_dark .pedestal-column_1 {
          background: radial-gradient(91.67% 122.17% at 69.17% -11.17%, #FFA300 0%, #2D1C00 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.4);
        }

        .slide_light .pedestal-column {
          background: linear-gradient(180deg, rgba(244, 244, 244, 0.9) 0.82%, #E9E9E9 100%, rgba(234, 234, 234, 0) 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(207, 207, 207, 0.5);
        }

        .slide_light .pedestal-column_1 {
          background: linear-gradient(180deg, #FFF2D1 0.82%, #FFD66C 100%);
          box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.8);
        }

        .pedestal-column_1.pedestal-column_portrait {
          height: 48vh;
        }
        .pedestal-column_2.pedestal-column_portrait {
          height: 41vh;
        }
        .pedestal-column_3.pedestal-column_portrait {
          height: 34vh;
        }

        .pedestal-column_1.pedestal-column_landscape {
          height: 29vh;
        }
        .pedestal-column_2.pedestal-column_landscape,
        .pedestal-column_3.pedestal-column_landscape {
          height: 23.5vh;
        }
        .pedestal-column_4.pedestal-column_landscape,
        .pedestal-column_5.pedestal-column_landscape {
          height: 18vh;
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

  renderPedestal() {
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

    return rearrangedUsers.map(({ rank, person }) => {
      const columnClasses = classNames(
        'pedestal-column',
        `pedestal-column_${rank}`,
        `pedestal-column_${this.orientation}`,
        {'pedestal-column_top': person.id === topLeaderId }
      );

      return html`
        <div>
          <person-leader
            .data=${person}
            theme=${this.theme}
            emoji=${ifDefined(person.id === topLeaderId ? this.data.emoji : undefined)}
          ></person-leader>
          <div class=${columnClasses}>
          </div>
        </div>
      `
    });
  }

  render() {
    console.log(this.renderPedestal());

    const topLeaderId = this.getTopLeaderId();
    return html`
      <div class="slide slide_${this.theme}">
        <div class="title-area">
        </div>
        <div class="stage">
          ${this.renderPedestal()}
        </div>
      </div>
    `;
  }

}
