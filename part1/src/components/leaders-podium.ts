import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames';

import { Person } from '../types/person';

const columnHeightMapPortrait = new Map([
  [1, 1],
  [2, 0.85],
  [3, 0.69]
]);

const columnHeightMapLandscape = new Map([
  [1, 1],
  [2, 0.81],
  [3, 0.81],
  [4, 0.63],
  [5, 0.63]
]);

@customElement('leaders-podium')
class LeadersPodium extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        position: relative;
      }

      :host([theme="dark"]) .step {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) -2.22%, rgba(0, 0, 0, 0.8) 100%),
          radial-gradient(149.08% 95.38% at 38.75% 71.48%, #000000 0%, #231900 0.01%, #4D4D4D 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6);
      }

      :host([theme="dark"]) .step_1 {
        background: radial-gradient(91.67% 122.17% at 69.17% -11.17%, #FFA300 0%, #2D1C00 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.4);
      }

      :host([theme="light"]) .step {
        background: linear-gradient(180deg, rgba(244, 244, 244, 0.9) 0.82%, #E9E9E9 100%, rgba(234, 234, 234, 0) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(207, 207, 207, 0.5);
      }

      :host([theme="light"]) .step_1 {
        background: linear-gradient(180deg, #FFF2D1 0.82%, #FFD66C 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.8);
      }

      .column, .column * {
        box-sizing: border-box;
      }

      .column {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .step {
        box-sizing: border-box;
        width: 100%;
        border-radius: 6px 6px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4vmin 0;
      }

      @media (orientation: portrait) {
        .column_1 {
          z-index: 2;
        }

        .column_2, column_3 {
          z-index: 1;
        }
      }

      @media (orientation: landscape) {
        .column_1 {
          z-index: 2;
        }

        .column_2, column_3 {
          z-index: 1;
        }

        .column_4, column_5 {
          z-index: 0;
        }
      }

      .rank {
        font-size: 8vmin;
        line-height: 1;
        color: var(--body-color);
      }

    `;
  }

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  @property({ type: String })
  emoji!: string;

  @property({ type: Array })
  people!: Person[];

  @property({ type: Array })
  dimensions: { width: number, height: number } | null = null;

  columnOverlapPercent = 0.133; // 13.3% of column width

  observeSize = () => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.dimensions = { width, height };
      }
    });
    resizeObserver.observe(this);
  }

  firstUpdated() {
    this.observeSize();
  }

  getColumnWidthPortrait() {
    const containerWidth = this.dimensions?.width as number;
    const containerHeight = this.dimensions?.height as number;
    const maxColumnHeightPercent = 0.604; // 60.4% of container height
    const widthToHeightRatioForHighestColumn = 0.355; // 35.5%

    /**
     * If container width is a limiting factor:
     *  containerWidth = (3x - 13.3%x * 2)  where column overlap width is 13.3% of column width
     *  containerWidth = 2.734x
     *  x = containerWidth / 2.734
     * If container height is a limiting factor:
     *  x = containerHeight * 60.4% * 35.5%
     */

    return Math.round(
      Math.min(
        containerWidth / 2.734,
        containerHeight * maxColumnHeightPercent * widthToHeightRatioForHighestColumn
     )
    );
  }

  getColumnWidthLandscape() {
    const containerWidth = this.dimensions?.width as number;
    const containerHeight = this.dimensions?.height as number;

    /**
     * If container width is a limiting factor:
     * containerWidth = (5x - 13.3%x * 4)
     * containerWidth = 4.468x
     * x = containerWidth / 4.468
     * If container height is a limiting factor:
     * - leader-person should take no more than 60.3% of container height
     * - for leader-person, width is 74.1% of height
     * containerHeight * 0.603 = x / 0.741
     * x = containerHeight * 0.603 * 0.741
     */

    return Math.round(
      Math.min(
        containerWidth / 4.468,
        containerHeight * 0.603 * 0.741
      )
    );
  }

  getColumnWidth() {
    return this.orientation === 'portrait'
      ? this.getColumnWidthPortrait()
      : this.getColumnWidthLandscape();
  }

  getMaxColumnHeightPortrait() {
    const containerHeight = this.dimensions?.height as number;
    const columnWidth = this.getColumnWidthLandscape();
    const leaderHeight = columnWidth / 0.741;
    const minPaddingTop = 0.07; // 7%, as in landscape orientation

    const naturalColumnHeight = containerHeight * 0.582; // 58.2% of container height
    const restrictedColumnHeight = containerHeight - containerHeight * minPaddingTop - leaderHeight;
    return Math.min(naturalColumnHeight, restrictedColumnHeight);
  }

  getMaxColumnHeightLandscape() {
    const containerHeight = this.dimensions?.height as number;
    const paddingTop = 0.07; // 7%
    const columnWidth = this.getColumnWidthLandscape();
    const leaderHeight = columnWidth / 0.741;
    return containerHeight - containerHeight * paddingTop - leaderHeight;
  }

  getMaxColumnHeight() {
    return this.orientation === 'portrait'
      ? this.getMaxColumnHeightPortrait()
      : this.getMaxColumnHeightLandscape();
  }

  getTopLeader() {
    return this.people[0];
  }

  getLeaders() {
    const maxIndex = this.orientation === 'portrait' ? 3 : 5;
    const leaders = this.people.slice(0, maxIndex);
    const rearrangedLeaders: {rank: number, person: Person }[] = [];
    leaders.forEach((person, index) => {
      const data = {
        rank: index + 1,
        person
      };
      if (index % 2 == 0) {
        rearrangedLeaders.unshift(data);
      } else {
        rearrangedLeaders.push(data);
      }
    });
    return rearrangedLeaders;
  }

  render() {
    if (!this.dimensions) {
      return null;
    }
    return html`
      ${this.renderColumns()}
    `;
  }

  renderColumns() {
    const columnWidth = this.getColumnWidth();
    const maxColumnHeight = this.getMaxColumnHeight();
    const leaders = this.getLeaders();
    return leaders
      .map(({ rank, person }, index) => {
        const columnClasses = classNames(
          'column',
          `column_${rank}`
        );
        const stepClasses = classNames(
          'step',
          `step_${rank}`
        );
        const columnLeftOffset = this.calculateColumnPosition(index, leaders.length, columnWidth);
        const leaderWidth = this.getLeaderWidth(columnWidth);
        const leaderHeight = Math.round(1.56 * leaderWidth);
        const stepHeight = this.getColumnHeight(maxColumnHeight, rank);

        return html`
          <div class="${columnClasses}" style="left: ${columnLeftOffset}; width: ${columnWidth}px;">
            <div class="person-wrapper" style="${this.getColumnPadding(columnWidth, rank)}">
              <person-leader
                .data=${person}
                theme=${this.theme}
                emoji=${ifDefined(rank === 1 ? this.emoji : undefined)}
                style="width: ${leaderWidth}px; height: ${leaderHeight}px"
              ></person-leader>
            </div>
            <div class="${stepClasses}" style="height: ${stepHeight}px; ${this.getColumnPadding(columnWidth, rank)}">
              <div class="rank">
                ${rank}
              </div>
            </div>
          </div>
        `;
      });
  }

  calculateColumnPosition = (index: number, columnsCount: number, columnWidth: number) => {
    const overlapWidth = columnWidth * this.columnOverlapPercent;

    const midIndex = Math.floor(columnsCount / 2);
    let left;
    if (index === midIndex) {
      left = `calc(50% - ${Math.round(columnWidth / 2)}px)`;
    } else {
      const multiplier = index - midIndex;
      const shiftForOverlap = -1 * multiplier * overlapWidth;
      left = `calc(50% + ${Math.round(multiplier * columnWidth)}px + ${Math.round(shiftForOverlap)}px - ${Math.round(columnWidth / 2)}px)`;
    }
    return left;
  }

  getColumnHeight(maxColumnHeight: number, columnIndex: number) {
    const coefficientsMap = this.orientation === 'portrait'
      ? columnHeightMapPortrait
      : columnHeightMapLandscape;
    const coefficient = coefficientsMap.get(columnIndex) as number;
    return maxColumnHeight * coefficient;
  }

  getColumnPadding(columnWidth: number, columnRank: number) {
    const paddingWidth = columnWidth * this.columnOverlapPercent;
    if (columnRank === 1){
      return '';
    }

    if ((this.orientation === 'portrait' && columnRank === 2) ||
      (this.orientation === 'landscape' && [2,4].includes(columnRank))
    ) {
      return `padding-left: ${paddingWidth}px`;
    } else {
      return `padding-right: ${paddingWidth}px`;
    }
  }

  getLeaderWidth(columnWidth: number) {
    return Math.floor(columnWidth * 0.866);
  }

}
