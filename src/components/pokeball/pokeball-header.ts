import { Component } from '../component-abstract.js';

export class Header extends Component {
  template: string = '';

  constructor(public selector: string) {
    super();
    this.template = this.createHTMLTemplate();
    this.outerRender(this.selector);
  }

  createHTMLTemplate() {
    return `
    <div class="header pokeball">
      <div class="header-title">
        <h1>The</h1>
        <img class="header-logo" src="../images/pokemon-logo.svg" alt="">
        <h1>App</h1>
      </div>
      <div class="header-pokeball">
      
        <img src="./images/pokeball-icon.png"></img>
        <div>Pokeball</div>
      </div>
    </div>`;
  }
}
