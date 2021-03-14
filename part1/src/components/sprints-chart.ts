import { LitElement, html, css, customElement, property } from 'lit-element';
import classNames from 'classnames';

type Data = Array<{
  title: string;
  value: number;
  active?: true;
}>;


@customElement('sprints-chart')
class SprintsChart extends LitElement {

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .plotting-area {
        flex-grow: 0;
        height: calc(100% - 3rem);
        position: relative;
      }

      .bar-value {
        position: absolute;
        top: -0.5rem;
        left: 50%;
        color: var(--body-color);
        transform: translate(-50%, -100%);
      }

      .bar-label {
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        color: var(--body-grey-color);
        transform: translate(-50%, 100%);
      }
    `;
  }

  @property({ type: Object })
  data!: Data;

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  @property({ type: Object })
  plotSize: { width: number, height: number } | null = null;

  observeSize = () => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.plotSize = { width, height };
      }
    });
    resizeObserver.observe(this.shadowRoot?.querySelector('.plotting-area') as Element);
  }

  firstUpdated() {
    this.observeSize();
  }

  render() {
    this.renderLandscape();
    const plottingAreaClasses = classNames(
      'plotting-area',
      `plotting-area_${this.theme}`,
      `plotting-area_${this.orientation}`,
    );
    return html`
      <div class=${plottingAreaClasses}>
        ${ this.orientation === 'portrait'
          ? this.renderPortrait()
          : this.renderLandscape()
        }
      </div>
    `;
  }

  // FIXME: combine renderPortrait and renderLandscape into a single function
  renderPortrait() {
    if (!this.plotSize) {
      return null;
    }
    const { width, height } = this.plotSize;
    const activeSprintIndex = this.data.findIndex(({ active }) => active);
    const slice = this.data.slice(activeSprintIndex - 3, activeSprintIndex + 3);

    const maxHeight = Math.round(height * 0.7);
    const minHeight = Math.round(height * 0.02);
    const numBars = 6; // Is this a good choice? Should it scale to 8 for wider screens?
    const intervalToBarRatio = 0.6;
    const barWidth = width / (numBars + numBars * intervalToBarRatio); // 6x + 0.6x * 6 = width
    const intervalWidth = 0.6 * barWidth;
    const maxValue = slice.reduce((acc, { value }) => {
      return Math.max(acc, value);
    }, 0);
    const barHeights = slice.map(({ value }) => {
      const fractionOfMaxValue = value / maxValue;
      return Math.round(fractionOfMaxValue * (maxHeight - minHeight));
    });
    const activeSprintIndexInSlice = slice.findIndex(item => item.active);

    return barHeights.map((height, index) => {
      const isActiveSprint = index === activeSprintIndexInSlice;
      const background = isActiveSprint
        ? 'radial-gradient(81.14% 100% at 50% 0%, #FFA300 0%, #2D1C00 100%)' // dark
        : 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), radial-gradient(149.08% 93.3% at 38.75% 72.1%, #000000 0%, #231900 0.01%, #4D4D4D 100%)';
      const boxShadow = isActiveSprint
        ? 'inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.5)'
        : 'inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6)';
      const barData = slice[index]; 

      return html`
        <div style="
          position: absolute;
          left: ${index * barWidth + index * intervalWidth - Math.round(barWidth / 5)}px;
          bottom: 0;
          width: ${barWidth}px;
          height: ${height + minHeight}px;
          border-radius: 6px;
          background: ${background};
          box-shadow: ${boxShadow};
        ">
          ${
            index <= activeSprintIndexInSlice ?
            html`
              <div class="bar-value">
                ${ barData.value }
              </div>
            ` : null
          }
          <div class="bar-label">
            ${ barData.title }
          </div>
        </div>
      `;
    });
  }

  renderLandscape() {
    if (!this.plotSize) {
      return null;
    }
    const barsData = this.getLandscapeBarsData();
    const { width, height } = this.plotSize;
    
    const maxHeight = Math.round(height * 0.7);
    const minHeight = Math.round(height * 0.02);
    const numBars = barsData.length;
    const intervalToBarRatio = 0.6;

    /**
     * nx + (n-1)*0.6x = width
     * 1.6nx - 0.6x = width
     * x(1.6n - 0.6) = width
     * x = width / (1.6n - 0.6)
    */
    const barWidth = width / ((1 + intervalToBarRatio) * numBars - intervalToBarRatio);
    const intervalWidth = 0.6 * barWidth;
    const maxValue = barsData.reduce((acc, { value }) => {
      return Math.max(acc, value);
    }, 0);
    const barHeights = barsData.map(({ value }) => {
      const fractomOfMaxValue = value / maxValue;
      return Math.round(fractomOfMaxValue * (maxHeight - minHeight));
    });
    const activeSprintIndexInSlice = barsData.findIndex(item => item.active);

    return barHeights.map((height, index) => {
      const isActiveSprint = index === activeSprintIndexInSlice;
      const background = isActiveSprint
        ? 'radial-gradient(81.14% 100% at 50% 0%, #FFA300 0%, #2D1C00 100%)' // dark
        : 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), radial-gradient(149.08% 93.3% at 38.75% 72.1%, #000000 0%, #231900 0.01%, #4D4D4D 100%)';
      const boxShadow = isActiveSprint
        ? 'inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.5)'
        : 'inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6)';
      const barData = barsData[index]; 

      // notice that for landscape, there shouldn't be a half-bar-width shift to the left,
      return html`
        <div style="
          position: absolute;
          left: ${index * barWidth + index * intervalWidth}px;
          bottom: 0;
          width: ${barWidth}px;
          height: ${height + minHeight}px;
          border-radius: 6px;
          background: ${background};
          box-shadow: ${boxShadow};
        ">
          ${
            index <= activeSprintIndexInSlice ?
            html`
              <div class="bar-value">
                ${ barData.value }
              </div>
            ` : null
          }
          <div class="bar-label">
            ${ barData.title }
          </div>
        </div>
      `;
    });
  }

  getLandscapeBarsNumber() {
    const minBarWidth = 40;
    const minBarIntervalWidth = 24;
    const plotWidth = this.plotSize?.width as number;
    return Math.min(
      Math.floor((plotWidth + minBarIntervalWidth) / (minBarWidth + minBarIntervalWidth)),
      this.data.length
    );
  }

  getLandscapeBarsData() {
    const barsNumber = this.getLandscapeBarsNumber();
    const midIndex = Math.floor(this.data.length / 2);
    const startIndex = midIndex - Math.floor(barsNumber / 2);
    const endIndex = startIndex + barsNumber;
    return this.data.slice(startIndex, endIndex);
  }

}
