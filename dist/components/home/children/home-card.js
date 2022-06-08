import { Component } from '../../component-abstract.js';
export class PokemonCard extends Component {
    selector;
    pokemon;
    previewPokemon;
    template = '';
    constructor(selector, pokemon, previewPokemon) {
        super();
        this.selector = selector;
        this.pokemon = pokemon;
        this.previewPokemon = previewPokemon;
        this.template = this.createHTMLTemplate();
        this.addRender(this.selector);
        this.manageEvents();
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
    manageEvents() {
        document
            .querySelectorAll('.card.pokemon')
            .forEach((item) => item.addEventListener('click', this.handlerButton));
    }
    previewPokemonLocal(pokemon) {
        this.previewPokemon.bind(this);
    }
    handlerButton(ev) {
        const selectId = ev.target.id;
        console.log('click', selectId);
        // (() => this.previewPokemon(+selectId)).bind(this);
        this.previewPokemonLocal(+selectId);
    }
}
//# sourceMappingURL=home-card.js.map