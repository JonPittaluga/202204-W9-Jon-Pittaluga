import { PokemonCard } from '../home/children/home-card.js';
import { Component } from '../component-abstract.js';
import { ListHeader } from '../home/children/list-header.js';
import { pokemonsDataSample } from '../../models/data/pokemons-sample.js';
export class Pokeball extends Component {
    selector;
    template = '';
    listWip = document.querySelector('.list-wip')?.innerHTML;
    staticPokemons;
    allPokemons = [{ name: '', url: '' }]; // Store all the pokemons. Includes a first element so the index and the id's of the pokemons will fit
    visiblePokemons = []; // STATE: To store the visible pokemons in each list
    visibleRange = []; // For pagination. Stores arrays with pairs [start, end] for the pagination
    listSize = 30;
    countPokemons = 0;
    more = document.querySelector('#load-more-btn');
    constructor(selector) {
        super();
        this.selector = selector;
        this.staticPokemons = pokemonsDataSample; // NOTE: This gets the data from the static-local data.
        this.fetchAllPokemons();
        // this.fetchVisiblePokemons();
        this.template = this.createHTMLTemplate();
        this.outerRender('.list');
    }
    createHTMLTemplate() {
        return `    
    <div class="list">
      <div class="list-header">
        <h2 class="list-header__title">Known Pokemon List</h2>
        <p class="list-header__text">You are watching <span class="list-header__counter">__</span> of ${this.countPokemons}</p>
       <div class="list__navigation"></div>
    </div>
      <div class="list__cards"></div>
    </div>`;
    }
    renderHeader() {
        return new ListHeader('.list-header', this.countPokemons, this.listSize, this.loadNext.bind(this), this.loadPrevious.bind(this));
    }
    renderCard(arr) {
        // return this.visiblePokemons.forEach((pokemon) => {
        return arr.forEach((pokemon) => {
            console.log(pokemon);
            new PokemonCard('.list__cards', pokemon);
        });
    }
    renderEverything() {
        let allPokemonContainer = document.querySelector('#poke-container');
        allPokemonContainer.innerText = '';
        this.fetchAllPokemons();
    }
    fetchAllPokemons() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`)
            .then((response) => response.json())
            .then((allpokemon) => {
            allpokemon.results.forEach((pokemon) => {
                this.allPokemons.push(pokemon);
            });
            this.countPokemons = this.allPokemons.length;
            this.renderHeader();
            this.fetchVisiblePokemons();
        });
        console.log(this.allPokemons);
    }
    // gets the id's for the visible pokemons that will be rendered
    fetchVisiblePokemons(group) {
        group.forEach((item, index) => this.fetchDetailsAndRender(item));
        this.visibleRange.push(this.visibleRange[this.visibleRange.length - 1] + this.listSize); // To keep track of the latest selections
        console.log(this.visibleRange); // To keep track of the latest selections
    }
    fetchPokemonDetails(pokemon) {
        let url = pokemon.url;
        fetch(url)
            .then((response) => response.json())
            .then((pokemonDetails) => {
            // console.log(pokemonDetails);
            // this.renderPokemon(pokemonDetails);
        });
    }
    loadPrevious() {
        console.log('load previous clicked');
    }
    loadNext() {
        console.log('visibleRange', this.visibleRange[1]);
        this.fetchVisiblePokemons([...this.allPokemons].splice(this.visibleRange[1], this.listSize));
        this.outerRender('.list__cards');
    }
}
//# sourceMappingURL=pokeball-list.js.map