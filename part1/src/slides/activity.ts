import { html, customElement, property, css } from 'lit-element';
import classNames from 'classnames';

import { BaseSlide } from './base-slide';

import { resetStyles } from '../styles/reset';

import '../components/activity-indicator';

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

        .cell {
          width: 45px;
          height: 45px;
          background: grey;
          margin: 6px;
        }

        .row {
          display: flex;
          align-items: flex-end;
          height: 34px;
        }

        .row + .row {
          margin-top: -21px; // ??? what on earth is this?
        }

        .row:nth-child(even) {
          margin-left: 34px; // this is row height (same as cell width)
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
      <div class="title-area"></div>
      <div class="main">
        ${content}
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
