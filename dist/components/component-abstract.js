export class Component {
    template = '';
    // method to render a whole template, re-writing the whole innerHTML
    render(selector) {
        if (selector && document.querySelector(selector)) {
            document.querySelector(selector).innerHTML = this.template;
        }
    }
    // method to render code in the outer html -starting from the selector
    outerRender(selector) {
        if (selector && document.querySelector(selector)) {
            document.querySelector(selector).outerHTML = this.template;
        }
    }
    // method to add content to existing code, adding to the innerHTML
    addRender(selector) {
        if (selector && document.querySelector(selector)) {
            document.querySelector(selector).innerHTML +=
                this.template;
        }
    }
}
//# sourceMappingURL=component-abstract.js.map