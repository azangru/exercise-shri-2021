import { html, customElement, property, css } from 'lit-element';
import classNames from 'classnames';

import { BaseSlide } from './base-slide';

import { resetStyles } from '../styles/reset';

import '../components/slide-title';
import '../components/activity-indicator';
import '../components/activity-legend';

type SlideData = {
  title: string;
  subtitle: string;
  data: Record<string, number[]>;
};

// test with slide 10

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; // can't guarantee the order of object keys in Safari

@customElement('slide-activity')
class SlideActivity extends BaseSlide {

  static get styles() {
    return [
      resetStyles,
      css`
        :host {
          height: 100%;
          display: grid;
          grid-template-rows: [title] auto [main] 1fr;
          padding: 0 24px;
        }

        @media (orientation: landscape) {
          :host {
            --row-height: 9vh;
            --up-shift: -5.6vh;
          }
        }

        @media (orientation: portrait) {
          :host {
            --row-height: 11.4vw;
            --up-shift: -6.6vw;
          }

          .main {
            margin-left: calc(-1 * var(--row-height) / 2);
          }
        }

        .title-area {
          height: 100px;
        }

        .main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .row {
          display: flex;
          align-items: flex-end;
          height: var(--row-height);
        }

        .row + .row {
          margin-top: var(--up-shift);
        }

        .row:nth-child(even) {
          margin-left: var(--row-height);
        }

        activity-indicator {
          width: var(--row-height);
        }
      `
    ]
  }

  @property({ type: Object })
  data!: SlideData

  render() {
    const content = this.orientation === 'landscape' ?
      this.renderLandscape() :
      this.renderPortrait();
    
    
    return html`
      <div class="title-area">
        <slide-title title=${this.data.title} subtitle=${this.data.subtitle} orientation="${this.orientation}">
        </slide-title>
      </div>
      <div class="main">
        ${content}
        <activity-legend theme=${this.theme} orientation=${this.orientation}></activity-legend>
      </div>
    `;
  }

  renderLandscape() {
    const allCommitHours = weekDays
      .map(day => this.data.data[day])
      .map(condenseDailyActivity);

    const rowClasses = classNames(
      'row',
      'row_landscape'
    );

    return allCommitHours.map((dayHours) => {
      return html`
        <div class=${rowClasses}>
          ${dayHours.map(activityPerHour => {
            return html`
              <activity-indicator theme=${this.theme} activity=${activityPerHour}>
              </activity-indicator>
            `;
          })}
        </div>
      `;
    });
  }

  // TODO: renderPortrait and renderLandscape look identical in the return statement;
  // this can probably be combined into a single function
  renderPortrait() {
    // transpose the activity matrix in order to have hours in columns rather than in rows
    const allCommitHours = transpose(weekDays
      .map(day => this.data.data[day]));

    const rowClasses = classNames(
      'row',
      'row_portrait'
    );

    return allCommitHours.map((dayHours) => {
      return html`
        <div class=${rowClasses}>
          ${dayHours.map(activityPerHour => {
            return html`
              <activity-indicator theme=${this.theme} activity=${activityPerHour}>
              </activity-indicator>
            `;
          })}
        </div>
      `;
    });
  }

}

const condenseDailyActivity = (dailyActivity: number[]): number[] => {
  // condense hourly activity into two-hourly activity
  const condensedActivity: number[] = [];
  let tmp = 0;
  for (let i = 0; i < dailyActivity.length; i++) {
    if (i % 2 === 0) {
      tmp = dailyActivity[i];
    } else {
      tmp += dailyActivity[i];
      condensedActivity.push(tmp);
    }
  }
  return condensedActivity;
};

const transpose = (matrix: number[][]) => matrix.reduce(
  (newMatrix, row) => row.map((_, i) => [...(newMatrix[i] || []), row[i]]),
  [] as number[][]
);
