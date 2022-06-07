import { Component } from '../../component-abstract.js';
import { NavigatePages } from './list-header-navigation.js';
export class ListHeader extends Component {
    selector;
    totalPokemons;
    visiblePokemons;
    template = '';
    constructor(selector, totalPokemons, visiblePokemons) {
        super();
        this.selector = selector;
        this.totalPokemons = totalPokemons;
        this.visiblePokemons = visiblePokemons;
        this.template = this.createHTMLTemplate();
        this.render(this.selector);
        this.renderChildComponents();
    }
    // TODO: Revisar este template y cómo se carga…
    createHTMLTemplate() {
        return `    
    <div class="list-header">
      <h2 class="list-header__title">Known Pokemon List</h2>
      <p class="list-header__text">You are watching <span class="list-header__counter">${this.visiblePokemons}</span> of ${this.totalPokemons - 1}</p>
      <div class="list__navigation">
        <div class="button list__navigation--previous">PREVIOUS</div>
        <div class="button list__navigation--next">NEXT</div>
      </div>
    </div>`;
    }
    renderChildComponents() {
        return new NavigatePages('.list__navigation');
    }
}
//# sourceMappingURL=list-header.js.map