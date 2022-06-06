import { Component } from '../component-abstract.js';
import { Pokemon } from '../../models/pokemon-model.js';

export class PokemonCard extends Component {
  template: string = '';

  constructor(public selector: string, public pokemon: Pokemon) {
    super();
    this.template = this.createHTMLTemplate();
    this.addRender(this.selector);
  }

  createHTMLTemplate() {
    return `
      <div class="card">
        <div class="card-image">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.pokemon.id
          }.png" alt="">
        </div>
        <h3 class="card-title pokemonName">${this.pokemon.name.toUpperCase()}</h3>
      </div>`;
  }
}
