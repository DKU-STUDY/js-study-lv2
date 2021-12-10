import Item from "./component/item.js";
import ItemAppender from "./component/itemAppender.js";
import Footer from './component/footer.js'
import Component from "./core/component.js";

class App extends Component{
    stateInit(){
        console.log('construct App');
        this.state = {
            filter : 'all',
            item : [{key : 0, done: true, item: 'item0'}, {key: 1, done: false, item: 'item1'}, {key: 2, done: true, item: 'item2'}]
        }
    }

    content(){
        return`
        <h2>Ex#05</h2>
        <div class = 'appender'></div>
        <ul class='list'></ul>
        <div class = 'footer'></div>
        `
    }
    
    render(){
        console.log('App Rendered');
        console.log('state',this.state);
        this.target.innerHTML = this.content();
        new ItemAppender(this.target.querySelector('.appender'), [this.state, this.setState.bind(this)]);
        new Item(this.target.querySelector('.list'), [this.state, this.setState.bind(this)]);
        new Footer(this.target.querySelector('.footer'));
        this.setEvent();
    }
}

export default App;