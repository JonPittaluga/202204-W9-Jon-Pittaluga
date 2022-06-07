import { Component } from '../component-abstract.js';
import { HomeList } from './home-list.js';
export class Home extends Component {
    selector;
    template = '';
    constructor(selector) {
        super();
        this.selector = selector;
        this.createHTMLTemplate();
        this.render(this.selector);
        this.setTimeOut();
    }
    createHTMLTemplate() {
        return `
    <main class="main">
      <div class="main-placeholder">
        <img src="./images/pokemon-logo.svg" alt="" />
      </div>
      <div id="container" class="list">
      <div id="poke-container" class="ui cards"></div>
    </div>
    </main>`;
    }
    setTimeOut() {
        setTimeout(() => this.renderChildComponents(), 3000);
    }
    renderChildComponents() {
        return new HomeList('.list');
    }
}
//# sourceMappingURL=home.js.map