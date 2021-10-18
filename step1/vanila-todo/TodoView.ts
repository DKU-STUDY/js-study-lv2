import TodoModel from "./TodoModel";

export default class TodoView {
  model: TodoModel;
  ul: HTMLUListElement;
  target: HTMLElement;
  registerInput: HTMLInputElement;

  constructor(model: TodoModel) {
    this.model = model;
    this.ul = document.querySelector("ul") as HTMLUListElement;
    this.target = document.getElementById("app");
    this.registerInput = document.querySelector(".todo") as HTMLInputElement;
  }

  get RegisterInput(): HTMLInputElement {
    return this.registerInput;
  }

  get ulList(): HTMLUListElement {
    return this.ul;
  }

  template() {
    const style = {
      textDecoration: "line-through",
    };
    const { selected, todoList } = this.model.state;
    return todoList
      .map(
        (todo) => `
      <li data-key=${todo.id}>
      <input type="checkbox" class="checkbox" ${
        todo.completed ? "checked" : null
      }/>
      ${
        selected === todo.id
          ? `<input type="text" class="edit-input" value=${todo.text}/>`
          : `<span class="text" style=${todo.completed ? { ...style } : null}>${
              todo.text
            }</span>
      <button type="button" class="edit">수정</button>
      <button type="button" class="delete">삭제</button>`
      }
      </li>
    `
      )
      .join("");
  }

  render() {
    this.ul.innerHTML = this.template();
  }
}

//model은 일종의 자료구조
