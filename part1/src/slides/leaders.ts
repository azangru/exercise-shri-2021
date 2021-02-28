import {LitElement, html, customElement, property} from 'lit-element';

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
  data?: SlideData

  constructor() {
    super();
    this.theme = getTheme();
  }


  render() {
    return this.data?.users.map(user => html`<person-leader .data=${user} theme=${this.theme}></person-leader>`);
  }

}
