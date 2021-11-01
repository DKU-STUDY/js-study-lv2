import {TodoInput} from "./TodoInput";
import {TodoList} from "./TodoList";
import {Component} from "./Core/Component";
import {store} from "./TodoStore";
import {todoState} from "./Core/type";

export class App extends Component {
    template() {
        const {selected, todoList} = store.state;
        return `
        <div id="todoInput">
        </div>
    <h4>해야할 일들</h4><span>총 ${todoList.length}개</span>
    <ul class="todolist"></ul>
     `
    }

    mount() {
        new TodoInput(this.$el.querySelector("#todoInput") as HTMLElement, {});
        new TodoList(this.$el.querySelector(".todolist") as HTMLElement, {});
    }
}