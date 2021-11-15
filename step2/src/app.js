import Component from "./component.js";

class App extends Component{
    render(){
        const table = this.state.item;
        this.$app.innerHTML=`
        <h3>Example #2</h3>
        <ul>
        ${table.map(ele => `<li>${ele}</li>`).join('')}
        </ul>
        <button>추가</button>
        `
        document.querySelector('button').addEventListener('click', () => {
            this.setState({item : [...this.state.item, `item${this.state.item.length}`]});
            this.render();
        });
    
    }
    
}

new App({item: ['item0', 'item1', 'item2']});