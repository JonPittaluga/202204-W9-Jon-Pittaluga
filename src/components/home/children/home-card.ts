import { Component } from '../../component-abstract.js';
import { Pokemon } from '../../../models/pokemon-model.js';

export class PokemonCard extends Component {
  template: string = '';

  constructor(public selector: string, public pokemon: Pokemon) {
    super();
    this.template = this.createHTMLTemplate();
    this.addRender(this.selector);
    // this.manageEvents();
  }

  createHTMLTemplate() {
    return `
      <div class="card pokemon" id=${this.pokemon.id}>
        <div class="card-image">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.pokemon.id
          }.png" alt="">
        </div>
        <h3 class="card-title pokemonName">${this.pokemon.name.toUpperCase()}</h3>
      </div>`;
  }

  // Event listeners do not work. Make them work.
  manageEvents() {
    const cards: any = document.querySelectorAll('.pokemon');
    cards.addEventListener('click', this.openPokemonPage.bind(this));
  }

  openPokemonPage(pokemon: Pokemon) {
    console.log(pokemon.id);
  }

  // manageTemplate() {
  //   document
  //     .querySelector('.card')?.addEventListener('click', this.handlerSubmit.bind(this));
  // }

  // handlerSubmit(ev: Event) {
  //   ev.target && ev.target;
  // }
}
