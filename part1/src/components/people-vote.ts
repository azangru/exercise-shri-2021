import { LitElement, html, css, customElement, property } from 'lit-element';

import './person-vote';

import { Person } from '../types/person';

@customElement('people-vote')
class PeopleVote extends LitElement {

  @property({ type: String })
  theme!: string;

  @property({ type: String })
  orientation!: string;

  @property({ type: Array })
  people!: Person[];
  
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        height: 100%;
      }

      :host([orientation=portrait]) {
        flex-direction: column;
        justify-content: space-evenly;
      }
    `;
  }

  render() {
    return this.orientation === 'portrait'
      ? this.renderPortrait()
      : this.renderLandscape();
  }

  renderPortrait() {
    const person = this.people[0];

    return this.people.map(person => html`
      <person-vote .person=${person} theme=${this.theme}></person-vote>
    `);
  }
  
  renderLandscape() {
    return html``;
  }

}
