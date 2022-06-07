import { Pokemon, iPokemonModel } from '../../models/pokemon-model';
import { PokemonCard } from './children/home-card.js';
import { Component } from '../component-abstract.js';
import { ListHeader } from './children/list-header.js';
import { pokemonsDataSample } from '../../models/data/pokemons-sample.js';
export class HomeList extends Component {
  template: string = '';
  listWip: string | undefined = document.querySelector('.list-wip')?.innerHTML;
  staticPokemons: Array<Pokemon> = pokemonsDataSample;
  allPokemons: Array<iPokemonModel> = [{ name: '', url: '' }]; // Store all the pokemons. Includes a first element so the index and the id's of the pokemons will fit
  visiblePokemons: Array<Pokemon> = []; // STATE: To store the visible pokemons in each list

  visibleRange: Array<any | undefined> = [0]; // For pagination. Stores arrays with pairs [start, end] for the pagination
  listSize: number = 20;
  countPokemons: number = 0;

  // todo: Hardcode something to show the navigation effect and proof that this works.

  constructor(public selector: string) {
    super();
    // this.staticPokemons = pokemonsDataSample;
    this.fetchAllPokemons();
    this.template = this.createHTMLTemplate();
    this.outerRender(this.selector);
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
    return new ListHeader(
      '.list-header',
      this.countPokemons,
      this.listSize,
      this.loadNext.bind(this),
      this.loadPrevious.bind(this)
    );
  }

  renderCard(arr: Array<Pokemon>) {
    return arr.forEach((pokemon: Pokemon) => {
      new PokemonCard('.list__cards', pokemon);
    });
  }

  fetchAllPokemons() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`)
      .then((response) => response.json())
      .then((allpokemon: any) => {
        allpokemon.results.forEach((pokemon: iPokemonModel) => {
          this.allPokemons.push(pokemon);
        });
        this.countPokemons = this.allPokemons.length;
        this.renderHeader();
        this.fetchVisiblePokemons(
          [...this.allPokemons].splice(
            1,
            this.visibleRange[this.visibleRange.length - 1] + this.listSize
          )
        );
        this.outerRender(this.selector);
      });
  }

  // gets the id's for the visible pokemons that will be rendered
  fetchVisiblePokemons(group: Array<iPokemonModel>) {
    group.forEach((item, index) => this.fetchPokemonDetails(item));
    this.visibleRange.push(
      this.visibleRange[this.visibleRange.length - 1] + this.listSize
    ); // To keep track of the latest selections
    console.log(this.visibleRange); // To keep track of the latest selections
  }

  fetchPokemonDetails(pokemon: iPokemonModel) {
    let pokemonDetails: Pokemon;
    let url: any = pokemon.url;
    fetch(url)
      .then((response) => response.json())
      .then((response) => (pokemonDetails = response))
      .finally(() => {
        this.renderHeader();
        this.renderCard([pokemonDetails]);
      });
  }

  loadPrevious() {
    console.log('load previous clicked');
  }

  loadNext() {
    console.log('visibleRange', this.visibleRange[1]);

    this.fetchVisiblePokemons(
      [...this.allPokemons].splice(this.visibleRange[1], this.listSize)
    );
    this.outerRender('.list__cards');
  }
}
