import List from "./component/list.js";
import Item from "./component/item.js";

class App {
    constructor(){
        const $app = document.querySelector('.app');
        new List($app);
        
    }
}

new App();