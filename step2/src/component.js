class Component {
    constructor(){
        this.stateInit();
        this.render();
    }
    $app = document.querySelector('.app');
    state
    setState(newState){
        this.state = {...this.state, ...newState}
        this.render();
    }
    stateInit(){}
    render(){}
    bindEvent(){}
    
}

export default Component;