class Component {
    target
    constructor(target){
        this.target = target;
        this.stateInit();
        this.render();
    }
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