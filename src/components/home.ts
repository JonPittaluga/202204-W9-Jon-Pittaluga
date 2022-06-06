import { Component } from './component-abstract.js';
import { Header } from './header.js';
import { Pokemon, iPokemonModel } from '../models/pokemon-model.js';
import { List } from './children/list.js';

export class Home extends Component {
  template: string = '';
  listSize: number = 8;
  countPokemons: number = 0;
  totalPokemons: number = 100410; // FIXME: This is hardcoded value
  more: any = document.querySelector('#load-more-btn');

  constructor(public selector: string) {
    super();
    this.createHTMLTemplate();
    this.outerRender(this.selector);
    this.setTimeOut();
    // this.renderEverything();
    // this.manageRequestMoreData();
  }

  // TODO: Crea el template principal y añade el header
  createHTMLTemplate() {
    return new Header('.header');
  }

  setTimeOut() {
    setTimeout(() => this.renderChildComponents(), 1300);
  }

  renderChildComponents() {
    return new List('.list__navigation');
  }
}
