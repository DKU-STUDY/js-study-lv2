import {observable} from "./observer";
import {StoreProp, todoState, todoValue} from "./type";


export default class Store {
    #state;
    #mutations;
    #actions;
    state;

    constructor({state, mutations, actions}: StoreProp<todoState>) {
        this.#state = observable(state);
        this.#actions = actions;
        this.#mutations = mutations;


        this.state = new Proxy(state, {
            get: (target, name) => this.#state[name as keyof todoState],
        })
    }

    commit(action: string, payload: any) {

        this.#mutations[action](this.#state, payload);
    }

    dispatch(action: string, payload: any) {

        this.#actions[action]({
            state: this.#state,
            commit: this.commit.bind(this),
            dispatch: this.dispatch.bind(this)
        }, payload);
    }

}