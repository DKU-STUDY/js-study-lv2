import {Component} from "./Core/Component";
import {actions} from "./Core/Constants";
import {store} from "./TodoStore";

export class TodoInput extends Component {
    template() {
        return `
        할일입력  <form id="todo-form">
            <input type="text" class="todo">
            <button class="register">등록</button>
              </form>
`
    }

    setEvent() {
        this.addEvent("submit", "form#todo-form", (e) => {
            e.preventDefault();
            const text = (this.$el.querySelector("input.todo") as HTMLInputElement).value.trim();
            if (!text || text === "") {
                alert("한 글자 이상 입력하세요");
                return false;
            }
            store.commit(actions.ADD, text);
        })
    }

}