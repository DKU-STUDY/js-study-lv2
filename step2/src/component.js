class Component {
    constructor(newStat){
        this.setState(newStat);
        this.render();
    }
    $app = document.querySelector('.app');
    state
    setState(newState){
        this.state = {...this.state, ...newState}
        this.render();
    }

    render(){}

}

export default Component;