class Component {
    target
    constructor(target){
        if (arguments.length > 1){
            this.props = arguments[1][0];
            this.updateData = arguments[1][1];
            this.updateRender = arguments[1][2];
        }
        this.target = target;
        this.stateInit(); 
        this.render();
    }
    state
    props
    updateData
    setState(newState){
        this.state = newState;
        this.render();
    }
    content(){return ''}
    stateInit(){}
    setEvent(){}
    render(){
        this.target.innerHTML = `${this.content()}`;
        this.setEvent();
    }
    
}

export default Component;