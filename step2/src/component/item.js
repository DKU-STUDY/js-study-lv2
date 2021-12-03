import Component from "../core/component.js";

class Item extends Component{

    content(){
        console.log('props', this.props);
        return this.props.item.map(ele => `
        <li>${ele.item}<button class = ${ele.key}>삭제</button></li>
        `).join('');
    }

    render(){
        this.target.innerHTML = this.content();
        this.setEvent();
    }

    setEvent(){
        const buttons = this.target.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click' , ()=> {
                console.log(button.classList[0]);
                let newstate = {item : this.props.item.filter(ele => ele.key != button.classList[0])}
                this.props = newstate;
                this.updateData(newstate);
                //this.render();
            });
            });
    }
}


export default Item