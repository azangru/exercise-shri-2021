import {LitElement, html, customElement, property} from 'lit-element';

import '../components/avatar';

import { User } from '../types/user';

type SlideData = {
  title: string;
  subtitle: string;
  emoji: string;
  users: User[]
};

@customElement('slide-leaders')
class SlideLeaders extends LitElement {

  @property({type: Object})
  data?: SlideData

  render() {
    console.log('this.data', this.data);
    return this.data?.users.map(user => html`<x-avatar name="${user.name}" file="${user.avatar}"></x-avatar>`);
  }

}