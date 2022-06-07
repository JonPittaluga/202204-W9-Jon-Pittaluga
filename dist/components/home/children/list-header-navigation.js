import { Component } from '../../component-abstract.js';
export class NavigatePages extends Component {
    selector;
    loadPrevious;
    loadNext;
    template = '';
    constructor(selector, loadPrevious, loadNext) {
        super();
        this.selector = selector;
        this.loadPrevious = loadPrevious;
        this.loadNext = loadNext;
        this.template = this.createHTMLTemplate();
        this.outerRender(this.selector);
        this.manageTemplate();
    }
    // TODO: Revisar este template y cómo se carga… quizá molaría pasarle datos para saber si hay o no hay next y previous y tener un estado disables
    createHTMLTemplate() {
        return `
    <div class="list__navigation">
      <div class="button list__navigation--previous">PREVIOUS</div>
      <div class="button list__navigation--next">NEXT</div>
    </div>`;
    }
    manageTemplate() {
        const previous = document.querySelector('.list__navigation--previous');
        previous?.addEventListener('click', this.loadPrevious.bind(this));
        const next = document.querySelector('.list__navigation--next');
        next?.addEventListener('click', this.loadNext.bind(this));
    }
}
//# sourceMappingURL=list-header-navigation.js.map