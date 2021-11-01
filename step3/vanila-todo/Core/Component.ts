import {Action} from "./Constants";
import {store} from "../TodoStore";
import {observe} from "./observable";
import Store from "./Store";

export class Component {
    $el: HTMLElement;
    props;


    constructor($el: HTMLElement, props: any) {
        this.$el = $el;
        this.props = props;
        this.setup();

    }

    setup() {

        observe(() => {
            this.render();
        });
        this.setEvent();
        this.mount();

    }

    template() {
        return ``
    }

    render() {
        this.$el.innerHTML = this.template()
    }

    mount() {
    }

    setEvent() {
    }

    addEvent<T extends keyof HTMLElementEventMap>(eventType: T, selector: string, callback: (e: HTMLElementEventMap[T]) => void) {
        const children = [...this.$el.querySelectorAll(selector)];
        const isTarget = (target: any) => target.closest(selector) || children.includes(target);
        this.$el.addEventListener(eventType, (e) => {
            if (!isTarget(e.target)) return false;
            callback(e);
        })
    }
}