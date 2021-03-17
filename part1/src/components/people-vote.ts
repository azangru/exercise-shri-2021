import { LitElement, html, css, customElement, property } from 'lit-element';
import classNames from 'classnames';

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
  
  @property({ type: String })
  position: 'left' | 'right' | null = null;

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

      :host([orientation=landscape]) {
        justify-content: space-evenly;
      }

      .column_landscape {
        display: flex;
        flex-direction: column;
      }

      .column_inner {
        justify-content: space-evenly;
      }

      .column_outer {
        justify-content: center;
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
    return this.renderPeople(this.people);
  }
  
  renderLandscape() {
    const firstGroup = this.position === 'left'
      ? this.people.slice(0, 1) : this.people.slice(0, 2);
    const secondGroup = this.position === 'left'
      ? this.people.slice(1) : this.people.slice(2);
    const firstColumnClasses = classNames(
      'column',
      'column_landscape',
      { 'column_outer': this.position === 'left'},
      { 'column_inner': this.position === 'right'}
    );
    const secondColumnClasses = classNames(
      'column',
      'column_landscape',
      { 'column_outer': this.position === 'right'},
      { 'column_inner': this.position === 'left'}
    );
    return html`
      <div class=${firstColumnClasses}>
        ${this.renderPeople(firstGroup)}
      </div>
      <div class=${secondColumnClasses}>
        ${this.renderPeople(secondGroup)}
      </div>
    `;
  }

  renderPeople(people: Person[]) {
    return people.map(person => html`
      <person-vote .person=${person} theme=${this.theme}></person-vote>
    `);
  }

}
