import { Component } from '../../component-abstract.js';
export class ListHeader extends Component {
    selector;
    totalPokemons;
    visiblePokemons;
    loadPrevious;
    loadNext;
    template = '';
    constructor(selector, totalPokemons, visiblePokemons, loadPrevious, loadNext) {
        super();
        this.selector = selector;
        this.totalPokemons = totalPokemons;
        this.visiblePokemons = visiblePokemons;
        this.loadPrevious = loadPrevious;
        this.loadNext = loadNext;
        this.template = this.createHTMLTemplate();
        this.render(this.selector);
        this.manageTemplate();
    }
    // TODO: Revisar este template y cómo se carga…
    createHTMLTemplate() {
        return `    
    <div class="list-header">
      <h2 class="list-header__title">Known Pokemon List</h2>
      <p class="list-header__text">You are watching <span class="list-header__counter">${this.visiblePokemons}</span> of ${this.totalPokemons}</p>    
      <div class="list__navigation">
        <div class="button list__navigation--previous">PREVIOUS</div>
        <div class="button list__navigation--next">NEXT</div>
      </div>
    </div>`;
    }
    // renderChildComponents() {
    //   return new NavigatePages(
    //     '.list__navigation',
    //     this.loadNext.bind(this),
    //     this.loadPrevious.bind(this)
    //   );
    // }
    manageTemplate() {
        const previous = document.querySelector('.list__navigation--previous');
        previous?.addEventListener('click', this.loadPrevious.bind(this));
        const next = document.querySelector('.list__navigation--next');
        next?.addEventListener('click', this.loadNext.bind(this));
    }
}
//# sourceMappingURL=list-header.js.map