import { Header } from './components/home/header.js';
import { HomeList } from './components/home/home-list.js';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    new Header('header');
    new HomeList('main');
    // new Pokeball('main')
  });
})();
