import { LitElement, html, css, customElement, property } from 'lit-element';

import './avatar';

import { Person } from '../types/person';

@customElement('person-in-sprints-chart')
class PersonInSprintsChart extends LitElement {

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
                          "avatar name"
                          "avatar value";
        grid-column-gap: 1rem;
      }

      x-avatar {
        grid-area: avatar;
      }

      .person-name {
        grid-area: name;
        font-size: var(--font-size-medium);
        color: var(--body-color);
      }
      .person-value {
        grid-area: value;
        font-size: var(--font-size-small);
        color: var(--body-grey-color);
      }
    `;
  }

  @property({type: String})
  theme!: string;

  @property({type: Object})
  data!: Person;

  render() {
    return html`
      <x-avatar
        small
        name="${this.data.name}"
        file="${this.data.avatar}"
      ></x-avatar>
      <div class="person-name">
        ${this.data.name}
      </div>
      <div class="person-value">
        ${this.data.valueText}
      </div>
    `;
  }

}
