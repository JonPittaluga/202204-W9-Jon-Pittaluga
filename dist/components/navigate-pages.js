import { Component } from "./component-abstract.js";
export class NavigatePages extends Component {
    selector;
    template = '';
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createHTMLTemplate();
        this.outerRender(this.selector);
    }
    createHTMLTemplate() {
        return `
    <div class="list__navigation">
      <div class="button list__navigation--previous">PREVIOUS</div>
      <div class="button list__navigation--next">NEXT</div>
    </div>`;
    }
}
//# sourceMappingURL=navigate-pages.js.map