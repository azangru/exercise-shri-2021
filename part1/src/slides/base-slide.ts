import { LitElement, property } from 'lit-element';
import { Subscription } from 'rxjs';

import { theme$ } from '../theme';
import { orientation$ } from '../media-observer';

export class BaseSlide extends LitElement {

  @property({type: String})
  theme!: string

  @property({type: String})
  orientation!: string

  themeSubscription: Subscription;
  orientationSubscription: Subscription

  constructor() {
    super();

    this.themeSubscription = theme$.subscribe(this.onThemeChange);
    this.orientationSubscription = orientation$.subscribe(this.onOrientationChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.themeSubscription.unsubscribe();
    this.orientationSubscription.unsubscribe();
  }

  onThemeChange = (theme: string) => {
    this.theme = theme;
  }

  onOrientationChange = (orientation: string) => {
    this.orientation = orientation;
  }

}
