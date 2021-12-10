import Component from "../core/component.js";

class Item extends Component{

    content(){
        console.log(this.props.item);
        return this.props.item.map( ele => {
            if (ele.done){
                return`
                <li>${ele.item}
                    <button class= 'toggleStat' style = 'color: blue'>완료됨</button>
                    <button class = ${ele.key} style = 'margin-left: 5px; color: #800000'>삭제</button>
                </li>
                `
            }
            return`
            <li>${ele.item}
                <button class = 'toggleStat' style = 'color: red'>진행중</button>
                <button class = ${ele.key} style = 'margin-left: 5px; color: #800000'>삭제</button>
            </li>
            `
    }).join('');
    }

    render(){
        this.target.innerHTML += this.content();
        this.setEvent();
    }

    setEvent(){
        const buttons = this.target.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click' , ()=> {
                console.log(button.classList[0]);
                let newstate = {item : this.props.item.filter(ele => ele.key != button.classList[0])}
                this.updateData(newstate);
            });
            });
    }
}


export default Item