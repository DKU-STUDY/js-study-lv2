import Component from "../core/component.js";

class Footer extends Component{
    content(){
        return`
        <button class='done' style = 'color: blue'>완료됨</button>
        <button class='progressing' style = 'color : red'>진행중</button>
        <button class= 'all'>모두보기</button>
        `
    }
    render(){
        console.log(this.target);
        this.target.innerHTML += this.content();
        this.setEvent();
    }
}

export default Footer