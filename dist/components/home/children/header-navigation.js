import { Component } from '../component-abstract.js';
export class NavigatePages extends Component {
    selector;
    template = '';
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createHTMLTemplate();
        this.outerRender(this.selector);
    }
    // TODO: Revisar este template y cómo se carga… quizá molaría pasarle datos para saber si hay o no hay next y previous y tener un estado disables
    createHTMLTemplate() {
        return `
    <div class="list__navigation">
      <div class="button list__navigation--previous">PREVIOUS</div>
      <div class="button list__navigation--next">NEXT</div>
    </div>`;
    }
}
//# sourceMappingURL=header-navigation.js.map