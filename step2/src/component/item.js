import Component from "../core/component.js";

class Item extends Component{

    content(){
        console.log(this.props.item);
        if(this.props.filter === 'all'){
        return this.props.item.map( ele => {
            if (ele.done){
                return`
                <li>${ele.item}
                    <button class= '${ele.key} toggleStat' style = 'color: blue'>완료됨</button>
                    <button class = '${ele.key} deleteItem' style = 'margin-left: 5px; color: #800000'>삭제</button>
                </li>
                `
            }
            return`
            <li>${ele.item}
                <button class = '${ele.key} toggleStat' style = 'color: red'>진행중</button>
                <button class = '${ele.key} deleteItem' style = 'margin-left: 5px; color: #800000'>삭제</button>
            </li>
            `
        }).join('');}
        if(this.props.filter === 'done'){
            return this.props.item.map( ele => {
               if(ele.done){
                   return`
                   <li>${ele.item}
                        <button class= '${ele.key} toggleStat' style = 'color: blue'>완료됨</button>
                        <button class = '${ele.key} deleteItem' style = 'margin-left: 5px; color: #800000'>삭제</button>
                    </li>
                   `
               } 
            }).join('');};
        return this.props.item.map( ele => {
            if(!ele.done)
                return`
                <li>${ele.item}
                    <button class = '${ele.key} toggleStat' style = 'color: red'>진행중</button>
                    <button class = '${ele.key} deleteItem' style = 'margin-left: 5px; color: #800000'>삭제</button>
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
            if(button.classList.contains('deleteItem')){
                button.addEventListener('click' , ()=> {
                    let newstate = {...this.props, item : this.props.item.filter(ele => ele.key != button.classList[0])}
                    this.updateData(newstate);
                });
            }
            if(button.classList.contains('toggleStat')){
                button.addEventListener('click', ()=> {
                    let newstate= {...this.props};
                    newstate.item.forEach(ele => {
                        if(ele.key == button.classList[0]){
                            ele.done = !ele.done;
                        }
                    })
                    this.updateData(newstate);
                })
            }
        });
    }
}


export default Item