import { Home } from './components/main.js';
(() => {
    document.addEventListener('DOMContentLoaded', main);
})();
function main() {
    console.log('works');
    // new Header('.header'); // This is a static element
    new Home('.main');
}
//# sourceMappingURL=app.js.map