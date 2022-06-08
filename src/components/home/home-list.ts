import { Pokemon, iPokemonModel } from '../../models/pokemon-model';
import { PokemonCard } from './children/home-card.js';
import { Component } from '../component-abstract.js';
import { ListHeader } from './children/list-header.js';
import { pokemonsDataSample } from '../../models/data/pokemons-sample.js';
// import { NavigatePages } from './children/list-header-navigation.js';
export class HomeList extends Component {
  template: string = '';
  viewPortHeight: number = window.innerHeight;
  scroll: number = 500;
  staticPokemons: Array<Pokemon> = pokemonsDataSample;
  allPokemons: Array<iPokemonModel> = [{ name: '', url: '' }]; // Store all the pokemons. Includes a first element so the index and the id's of the pokemons will fit
  visiblePokemons: Array<any> = []; // STATE: To store the visible pokemons in each list

  visibleRange: Array<any | undefined> = [0]; // For pagination. Stores arrays with pairs [start, end] for the pagination
  listSize: number = 20;
  countPokemons: number;
  navNextUrl: string = `https://pokeapi.co/api/v2/pokemon?limit=${this.listSize}`;
  navPreviousUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  // todo: Hardcode something to show the navigation effect and proof that this works.

  constructor(public selector: string) {
    super();
    // this.staticPokemons = pokemonsDataSample;
    this.countPokemons = 1126;
    this.fetchAllPokemons();
    this.template = this.createHTMLTemplate();
    this.outerRender(this.selector);
  }

  render() {
    this.renderListHeader();
  }

  createHTMLTemplate() {
    return `    
    <div class="list">
      <div class="list-header"></div>
      <div class="list__cards"></div>
    </div>`;
  }

  renderListHeader() {
    return new ListHeader(
      '.list-header',
      this.countPokemons,
      this.allPokemons.length - 1,
      this.loadPrevious.bind(this),
      this.loadNext.bind(this)
    );
  }

  renderCard(arr: Array<Pokemon>) {
    return arr.forEach((pokemon: Pokemon | any) => {
      return new PokemonCard(
        '.list__cards',
        pokemon,
        this.previewPokemon.bind(this)
      );
    });
  }

  fetchAllPokemons() {
    fetch(this.navNextUrl)
      .then((response) => response.json())
      .then((allpokemon: any) => {
        this.countPokemons = allpokemon.count;
        this.navNextUrl = allpokemon.next;
        this.navPreviousUrl = allpokemon.previous;
        allpokemon.results.forEach((pokemon: iPokemonModel) => {
          this.visiblePokemons.push(pokemon as iPokemonModel);
          this.allPokemons.push(pokemon);
        });
      })
      .finally(() => {
        this.fetchVisiblePokemons();
        this.visiblePokemons = [];
        this.render();
      });
  }

  // gets the id's for the visible pokemons that will be rendered
  fetchVisiblePokemons() {
    this.visiblePokemons.forEach((pokemon) =>
      this.fetchDetailsAndRender(pokemon)
    );
  }

  fetchDetailsAndRender(pokemon: iPokemonModel) {
    let pokemonDetails: Pokemon;
    let url: any = pokemon.url;
    fetch(url)
      .then((response) => response.json())
      .then((response) => (pokemonDetails = response))
      .finally(() => {
        this.renderCard([pokemonDetails]);
      });
  }

  scrollWindow(direction: string) {
    this.scroll += this.viewPortHeight * 3;

    if (direction === 'down') {
      window.scroll({
        top: this.scroll,
        left: 0,
        behavior: 'smooth',
      });
    } else if (direction === 'up') {
      window.scroll({
        top: -this.scroll,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  loadPrevious() {
    this.scrollWindow('up');
  }

  loadNext() {
    this.outerRender(this.selector);
    this.scrollWindow('down');
    this.fetchAllPokemons();
    console.log('loadNext clicked');
  }

  previewPokemon(pokemonId: number) {
    console.log(pokemonId);
    // return pokemonId;
  }
}
