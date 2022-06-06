import { Component } from './component-abstract.js';
import { Header } from './header.js';
import { List } from './children/list.js';
export class Home extends Component {
    selector;
    template = '';
    listSize = 8;
    countPokemons = 0;
    totalPokemons = 100410; // FIXME: This is hardcoded value
    more = document.querySelector('#load-more-btn');
    constructor(selector) {
        super();
        this.selector = selector;
        this.createHTMLTemplate();
        this.outerRender(this.selector);
        this.setTimeOut();
        // this.renderEverything();
        // this.manageRequestMoreData();
    }
    // TODO: Crea el template principal y añade el header
    createHTMLTemplate() {
        return new Header('.header');
    }
    setTimeOut() {
        setTimeout(() => this.renderChildComponents(), 1300);
    }
    renderChildComponents() {
        return new List('.list__navigation');
    }
}
//# sourceMappingURL=home.js.map