import { qs } from "../helpers.js";
import View from "./View.js";

export default class TodoListView extends View {
  constructor() {
    const tag = TodoListView.name;
    console.log(`[${tag}] constructor`);
    super(qs("#todoList"));

    this.template = new Template();
  }
  show(todoList) {
    console.log("updated todoList", todoList);
    this.element.innerHTML =
      todoList.length > 0
        ? this.template.getTodoList(todoList)
        : this.template.emptyTodo();
    super.show();
  }
}

class Template {
  emptyTodo() {
    return `<h2>No Todo</h2>`;
  }
  getTodoList(data = []) {
    return `
        <ul>
            ${data.map(this._getItem).join("")}
        </ul>
        `;
  }
  _getItem({ content }) {
    return `
        <li>
            ${content}
        </li>
        `;
  }
}
