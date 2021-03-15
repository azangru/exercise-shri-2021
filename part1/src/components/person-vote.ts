import { LitElement, html, css, customElement, property } from 'lit-element';

import './avatar';
import './avatar-with-emoji';

import { Person } from '../types/person';

@customElement('person-vote')
class PersonVote extends LitElement {

  @property({ type: Object })
  person!: Person;

  static get styles() {
    return css`
      :host, :host * {
        box-sizing: border-box;
      }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 104px;
        height: 142px;
        padding: 20px 16px;
        border-radius: 6px;
      }
      :host(:hover) {
        cursor: pointer;
      }
      :host([theme=dark]):host(:hover) {
        background: radial-gradient(85.62% 148.33% at 49.85% 100%, rgba(68, 58, 42, 0.7864) 0%, rgba(0, 0, 0, 0.8) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(255, 255, 255, 0.1);
      }


      .name {
        color: var(--body-color);
        font-size: var(--font-size-medium);
        text-align: center;
        line-height: 18px;
      }
    `;
  }

  render() {
    return html`
      <x-avatar
        name="${this.person.name}"
        file="${this.person.avatar}"
      ></x-avatar>
      <div class="name">${this.person.name}</div>
    `;
  }

}
