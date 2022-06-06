import { Header } from './components/header.js';
import { Home } from './components/main.js';
import { iPokemonModel, Pokemon } from './models/pokemon-model.js';

(() => {
  document.addEventListener('DOMContentLoaded', main);
})();

function main() {
  console.log('works');
  // new Header('.header'); // This is a static element
  new Home('.main');
}
