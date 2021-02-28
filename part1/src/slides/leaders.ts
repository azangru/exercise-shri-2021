import {LitElement, html, customElement, property} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import { getTheme } from '../theme';


import '../components/person-leader';

import { Person } from '../types/person';

type SlideData = {
  title: string;
  subtitle: string;
  emoji: string;
  users: Person[]
};

@customElement('slide-leaders')
class SlideLeaders extends LitElement {

  @property({type: String})
  theme: string

  @property({type: Object})
  data!: SlideData

  constructor() {
    super();
    this.theme = getTheme();
  }

  private getTopLeaderId() {
    // users in the data.users array seem to have already been ranked
    return this.data.users[0].id;
  }

  render() {
    const topLeaderId = this.getTopLeaderId();
    return this.data.users.map(user =>
      html`
        <person-leader
          .data=${user}
          theme=${this.theme}
          emoji=${ifDefined(user.id === topLeaderId ? this.data.emoji : undefined)}
        ></person-leader>`
    );
  }

}
