import {observable} from "./observable";
import {StoreProp, todoState, todoValue} from "./type";
import {Repository} from "./Repository";
import {STORAGE_KEY} from "./Constants";


export default class Store {
    private $state;
    private $mutations;
    private $actions;
    private repo = new Repository<todoState>(STORAGE_KEY)
    state;

    constructor({mutations, actions}: StoreProp<todoState>) {
        this.$state = observable(this.initState());
        this.$actions = actions;
        this.$mutations = mutations;


        this.state = new Proxy(this.initState(), {
            get: (target, name) => Reflect.get(this.$state, name)
        })
    }

    initState() {

        return this.repo.get() || {
            selected: -1,
            todoList: [{
                id: 1,
                text: "hi",
                completed: false
            }]
        }
    }

    commit(action: string, payload: any) {

        this.$mutations[action](this.$state, payload);
        this.repo.set(this.$state);
    }

    dispatch(action: string, payload: any): any {

        return this.$actions[action]({
            state: this.$state,
            commit: this.commit.bind(this),
            dispatch: this.dispatch.bind(this)
        }, payload);
    }

}