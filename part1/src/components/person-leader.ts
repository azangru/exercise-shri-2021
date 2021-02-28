import { LitElement, html, css, customElement, property } from 'lit-element';
// import { ifDefined } from 'lit-html/directives/if-defined';

import './avatar';

import { Person } from '../types/person';

@customElement('person-leader')
class PersonOnLeadersSlide extends LitElement {

  static get styles() {
    return css`
      .person-leader {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 104px;
        height: 162px;
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
    `;
  }

  @property({type: String})
  theme!: string;

  @property({type: Object})
  data!: Person;

  render() {
    return html`
      <div class="person-leader person-leader_${this.theme}">
        <x-avatar name="${this.data.name}" file="${this.data.avatar}"></x-avatar>
        <div class="person-leader__name">${this.data.name}</div>
        <div class="person-leader__value">${this.data.valueText}</div>
      </div>
    `;
  }

}
