import Component from "../core/component.js";

class ItemAppender extends Component{
    content(){
        return `
        <form>
            <input class = 'itemAppender'/>
            <button class = 'appendSubmit' >추가</button>
        </form>        
        `
    }
    render(){
        this.target.innerHTML += this.content();
        this.setEvent();
    }
    setEvent(){
        this.target.querySelector("form").addEventListener('submit', (e)=>{
            e.preventDefault();
        })
        const appendInput = this.target.querySelector('.itemAppender');
        const appendSubmit = this.target.querySelector('.appendSubmit');
        appendSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let inputdata = appendInput.value;
            appendInput.value = '';
            console.log(this.props);
            this.updateData({...this.props, item: [...this.props.item, {key: this.props.item[this.props.item.length - 1].key + 1, done: false, item: inputdata}]});
        })
    }
}

export default ItemAppender