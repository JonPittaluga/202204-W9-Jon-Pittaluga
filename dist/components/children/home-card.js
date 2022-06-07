import { Component } from '../component-abstract.js';
export class PokemonCard extends Component {
    selector;
    pokemon;
    template = '';
    constructor(selector, pokemon) {
        super();
        this.selector = selector;
        this.pokemon = pokemon;
        this.template = this.createHTMLTemplate();
        this.addRender(this.selector);
    }
    createHTMLTemplate() {
        return `
      <div class="card pokemon" id=${this.pokemon.id}>
        <div class="card-image">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png" alt="">
        </div>
        <h3 class="card-title pokemonName">${this.pokemon.name.toUpperCase()}</h3>
      </div>`;
    }
}
//# sourceMappingURL=home-card.js.map