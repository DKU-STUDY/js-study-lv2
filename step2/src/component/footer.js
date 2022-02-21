import Component from "../core/component.js";

class Footer extends Component{
    content(){
        return`
        <button class='done' style = 'color: blue'>완료됨</button>
        <button class='progressing' style = 'color : red'>진행중</button>
        <button class= 'all'>모두</button>
        `
    }
    render(){
        this.target.innerHTML += this.content();
        this.setEvent();
    }

    setEvent(){
        this.target.querySelector('.done').addEventListener('click', ()=> {
            this.updateData({...this.props, filter: 'done'});
        });
        this.target.querySelector('.progressing').addEventListener('click', ()=> {
            this.updateData({...this.props, filter: 'progressing'});
        });
        this.target.querySelector('.all').addEventListener('click', ()=> {
            this.updateData({...this.props, filter: 'all'});
        });
    }
}

export default Footer