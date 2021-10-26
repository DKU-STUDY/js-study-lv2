import {Component} from "./Core/Component";
import {store} from "./TodoStore";
import {actions} from "./Core/Constants";
import {todoItem} from "./Core/type";

export class TodoList extends Component {
    template() {
        const {selected, todoList} = store.state;
        return todoList.map((todo) => `
        <li data-id=${todo.id}>      
        ${todo.id === selected ?
            `<input type="text" id="todo-edit-input" value=${todo.text}/>` :
            (`<input type="checkbox" id="todo-toggle-checkbox"/>
        <span>${todo.text}</span>
        <button type="text" id="todo-edit-button">수정</button>
        <button type="text" id="todo-remove-button">삭제</button>`)
        }
</li>`).join("")
    }

    setEvent() {
        this.addEvent("change", "button#todo-toggle-checkbox", (e) => {
            const li = (e.target as HTMLElement).closest("li") as HTMLLIElement;
            store.commit(actions.TOGGLE, li.dataset.id);
        });
        this.addEvent("click", "button#todo-edit-button", (e) => {
            const li = (e.target as HTMLElement).closest("li") as HTMLLIElement;
            store.commit(actions.EDIT, li.dataset.id);
        })
        this.addEvent("click", "button#todo-remove-button", (e) => {
            const li = (e.target as HTMLElement).closest("li") as HTMLLIElement;
            store.commit(actions.DELETE, li.dataset.id);
        })
        this.addEvent("keyup", "input#todo-edit-input", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const text = (e.target as HTMLInputElement).value.trim();
                if (!text || text === "") {
                    alert("한 글자 이상 입력하세요")
                    return;
                }
                store.commit(actions.UPDATE, text);
            } else if (e.key === "Esc") {
                store.commit(actions.CANCEL, 0);
            } else return;
        })
    }
}