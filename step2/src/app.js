import Items from "./components/Item.js";

class App {
    constructor() {
        const $app = document.querySelector('#app');
        new Items($app);
    }
}

new App();