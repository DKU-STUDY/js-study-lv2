import Component from "../core/component.js";

class ItemAppender extends Component{
    content(){
        return `
        <form>
            <input class = 'itemAppender'/>
        </form>
        <button class = 'appendSubmit' >추가</button>
        `
    }
    render(){
        this.target.innerHTML += this.content();
        this.setEvent();
    }
    setEvent(){
        const appendInput = this.target.querySelector('.itemAppender');
        const appendSubmit = this.target.querySelector('.appendSubmit');
        appendSubmit.addEventListener('click', () => {
            let inputdata = appendInput.value;
            appendInput.value = '';
            console.log(this.props);
            this.updateData({...this.props, item: [...this.props.item, {key: this.props.item[this.props.item.length - 1].key + 1, item: inputdata}]});
        })
    }
}

export default ItemAppender