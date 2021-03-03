/**
 * Due to the shadow DOM encapsulation, global reset won't work :-(
*/

import { css } from 'lit-element';

export const resetStyles = css`
  :host,
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;
