import Component from "../core/component.js";
import Item from "./item.js";

class List extends Component{
    constructor(target){
        super(target);
        
    }
    stateInit(){
        console.log('constructList');
        this.state = {
            item : [{key : 0, item: 'item0'}, {key: 1, item: 'item1'}, {key: 2, item: 'item2'}]
        }
    }
    content(){
        return `
        <h2>Ex#03</h2>
        <ul class='list'></ul>
        <button class='append'>추가</button>
        `
    }
    render(){
        console.log('list Rendered');
        this.target.innerHTML = this.content();
        const $list = this.target.querySelector('.list');
        new Item($list, [this.state, this.setState.bind(this)]);
        this.setEvent();
    }
    setEvent(){
        const targetObj = this.target.querySelector('.append');
        targetObj.addEventListener('click', () => {
            console.log(this.state);
            console.log([...this.state.item, {key: this.state.item.length, item: `item${this.state.item.length}`}]);
            this.setState({item : [...this.state.item, {key: this.state.item.length, item: `item${this.state.item.length}`}]});
            //this.render();
            
        })
    }
    setState(newState){
        console.log('newState');
        this.state = newState;
        this.render.apply(this);
    }
}

export default List