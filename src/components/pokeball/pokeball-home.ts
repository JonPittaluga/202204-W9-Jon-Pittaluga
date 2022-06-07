import { Component } from '../component-abstract.js';
import { Header } from './pokeball-header.js';
import { Pokemon, iPokemonModel } from '../../models/pokemon-model.js';
import { HomeList } from '../home/home-list.js';

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
    setTimeout(() => this.renderChildComponents(), 3000);
  }

  renderChildComponents() {
    return new HomeList('.list__navigation');
  }
}
