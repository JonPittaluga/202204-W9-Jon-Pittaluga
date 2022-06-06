export abstract class Component {
  template: string = '';
  // method to render a whole template, re-writing the whole innerHTML
  render(selector: string) {
    if (selector && document.querySelector(selector)) {
      (<HTMLElement>document.querySelector(selector)).innerHTML = this.template;
    }
  }
  // method to render code in the outer html -starting from the selector
  outerRender(selector: string) {
    if (selector && document.querySelector(selector)) {
      (<HTMLElement>document.querySelector(selector)).outerHTML = this.template;
    }
  }
  // method to add content to existing code, adding to the innerHTML
  addRender(selector: string) {
    if (selector && document.querySelector(selector)) {
      (<HTMLElement>document.querySelector(selector)).innerHTML +=
        this.template;
    }
  }
}
