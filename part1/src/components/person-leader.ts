import { LitElement, html, css, customElement, property } from 'lit-element';

import './avatar';
import './avatar-with-emoji';

import { Person } from '../types/person';

@customElement('person-leader')
class PersonOnLeadersSlide extends LitElement {

  static get styles() {
    return css`
      .person-leader {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 104px;
        height: 162px;
        padding: 20px 16px;
      }

      .person-leader__name {
        color: var(--body-color);
        font-size: var(--font-size-medium);
        text-align: center;
        line-height: 18px;
        margin: 6px 0 4px;
      }

      .person-leader__value {
        color: var(--body-grey-color);
        font-size: var(--font-size-small);
        line-height: 16px;
        font-family: var(--font-family-thin);
      }

      .person-leader__emoji {
        position: absolute;
        z-index: 1;
        font-size: 32px;
        line-height: 1;
        top: 0;
      }
    `;
  }

  @property({type: String})
  theme!: string;

  @property({type: Object})
  data!: Person;

  @property({type: String})
  emoji?: string;

  render() {
    const avatar = html`
      <x-avatar
        name="${this.data.name}"
        file="${this.data.avatar}"
      ></x-avatar>`;

      return html`
      <div class="person-leader person-leader_${this.theme}">
        ${ this.emoji ?
          html`<avatar-with-emoji emoji="${this.emoji}">${avatar}</avatar-with-emoji>`:
          avatar
        }
        <div class="person-leader__name">${this.data.name}</div>
        <div class="person-leader__value">${this.data.valueText}</div>
      </div>
    `;
  }

}
