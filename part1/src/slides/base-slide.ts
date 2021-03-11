import { LitElement, property } from 'lit-element';
import { Subscription } from 'rxjs';

import { theme$ } from '../theme';
import { orientation$ } from '../media-observer';
import { bodySize$ } from '../body-size-observer';

export class BaseSlide extends LitElement {

  @property({type: String})
  theme!: string

  @property({type: String})
  orientation!: string

  @property({ type: Object })
  bodySize!: { width: number, height: number }

  themeSubscription: Subscription;
  orientationSubscription: Subscription;
  bodySizeSubscription: Subscription;

  constructor() {
    super();

    this.themeSubscription = theme$.subscribe(this.onThemeChange);
    this.orientationSubscription = orientation$.subscribe(this.onOrientationChange);
    this.bodySizeSubscription = bodySize$.subscribe(this.onBodySizeChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.themeSubscription.unsubscribe();
    this.orientationSubscription.unsubscribe();
    this.bodySizeSubscription.unsubscribe();
  }

  onThemeChange = (theme: string) => {
    this.theme = theme;
  }

  onOrientationChange = (orientation: string) => {
    this.orientation = orientation;
  }

  onBodySizeChange(size: { width: number, height: number }) {
    this.bodySize = size;
  }

}
