import {Component} from "./Core/Component";
import {Action} from "./Core/Constants";
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
            const text = (this.$el.querySelector("input.todo") as HTMLInputElement)
            if (!text.value.trim() || text.value.trim() === "") {
                alert("한 글자 이상 입력하세요");
                return false;
            }
            store.commit(Action.ADD, text.value.trim());
            text.value = "";
        })
    }

}