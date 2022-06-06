import { PokemonCard } from './pokemon-card.js';
import { Component } from '../component-abstract.js';
import { ListHeader } from './list-header.js';
import { pokemonsDataSample } from './../../models/data/pokemons-sample.js';
export class List extends Component {
    selector;
    template = '';
    listWip = document.querySelector('.list-wip')?.innerHTML;
    staticPokemons;
    allPokemons = [{ name: '', url: '' }]; // Store all the pokemons. Includes a first element so the index and the id's of the pokemons will fit
    visiblePokemons = []; // STATE: To store the visible pokemons in each list
    visibleRange = []; // For pagination. Stores arrays with pairs [start, end] for the pagination
    listSize = 20;
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
        return new ListHeader('.list-header', this.countPokemons, this.listSize);
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
    fetchVisiblePokemons() {
        let indexes = [];
        if (this.visibleRange.length === 0) {
            const start = 1;
            const end = 20;
            for (let i = start; i < end; i++) {
                indexes.push(i);
                let pokemonToPush = this.allPokemons[i];
                let url = pokemonToPush.url;
                fetch(url)
                    .then((response) => response.json())
                    .then((pokemonDetails) => {
                    this.renderCard([pokemonDetails]);
                });
            }
        }
        if (this.visibleRange.length > 0) {
            const lastVisibleId = [...this.visibleRange].pop()[1];
            const start = lastVisibleId + 1 - this.listSize;
            const end = lastVisibleId + 1;
            for (let i = start; i < end; i++) {
                indexes.push(i);
                let pokemonToPush = this.allPokemons[i];
                let url = pokemonToPush.url;
                fetch(url)
                    .then((response) => response.json())
                    .then((pokemonDetails) => {
                    this.renderCard([pokemonDetails]);
                    // this.visiblePokemons.push(pokemonDetails);
                });
            }
        }
        this.visibleRange.push([indexes.shift(), indexes.pop()]);
        console.log(this.visibleRange); // saves the first and the last index of the pokemons that will be rendered
        console.log(this.visiblePokemons); // saves the first and the last index of the pokemons that will be rendered
        console.log(typeof this.visiblePokemons); // saves the first and the last index of the pokemons that will be rendered
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
    // TODO: Usar métoo de componente padre
    renderPokemon(pokeData) {
        let allPokemonContainer = document.getElementById('poke-container');
        let pokeContainer = document.createElement('div'); //div will be used to hold the data/details for indiviual pokemon.{}
        pokeContainer.classList.add('ui', 'card');
        this.createPokeImage(pokeData.id, pokeContainer);
        let pokeName = document.createElement('h4');
        pokeName.innerText = pokeData.name;
        let pokeNumber = document.createElement('p');
        pokeNumber.innerText = `#${pokeData.id}`;
        let pokeTypes = document.createElement('ul'); //ul list will hold the pokemon types
        this.createTypes(pokeData.types, pokeTypes); // helper function to go through the types array and create li tags for each one
        pokeContainer.append(pokeName, pokeNumber, pokeTypes); //appending all details to the pokeContainer div
        allPokemonContainer && allPokemonContainer.appendChild(pokeContainer); //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
    }
    createTypes(types, ul) {
        types.forEach(function (type) {
            let typeLi = document.createElement('li');
            typeLi.innerText = type['type']['name'];
            ul.append(typeLi);
        });
    }
    createPokeImage(pokeID, containerDiv) {
        let pokeImgContainer = document.createElement('div');
        pokeImgContainer.classList.add('image');
        let pokeImage = document.createElement('img');
        pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
        pokeImgContainer.append(pokeImage);
        containerDiv.append(pokeImgContainer);
    }
    loadMore() {
        this.listSize += 5;
        this.renderEverything();
        console.log('countPokemons:', this.countPokemons);
    }
    manageRequestMoreData() {
        this.more.addEventListener('click', this.loadMore);
    }
}
//# sourceMappingURL=list.js.map