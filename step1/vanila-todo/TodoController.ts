import TodoModel from "./TodoModel";
import TodoView from "./TodoView";

export default class TodoController {
  model: TodoModel;
  view: TodoView;

  constructor(model: TodoModel) {
    this.model = model;
    this.view = model.view;
  }

  registerEventListener() {
    this.view.target.addEventListener("click", (e: any) => {
      if (e.target.classList.contains("register")) {
        this.AddTodoListData();
      }
      if (e.target.classList.contains("edit")) {
        const li = e.target.closest("li");
        const id = parseInt(li.dataset.key);
        this.model.toggleEditMode(id);
      }
      if (e.target.classList.contains("delete")) {
        const li = e.target.closest("li");
        this.DeleteTodoListData(li);
      }
    });

    this.view.target.addEventListener("keyup", (e: any) => {
      if (e.key == "Enter" && e.target.classList.contains("todo")) {
        this.AddTodoListData();
      }
      if (e.key == "Enter" && e.target.classList.contains("edit-input")) {
        const li = e.target.closest("li");
        this.UpdateTodoListData(li);
      } else if (
        e.key === "Escape" &&
        e.target.classList.contains("edit-input")
      ) {
        const li = e.target.closest("li");
        const id = parseInt(li.dataset.key);
        this.model.toggleEditMode(id);
      }
    });
  }

  AddTodoListData() {
    const currentInputData = this.view.RegisterInput.value;
    this.model.CurrentInputData = currentInputData;
    this.model.addTodoItem();
    this.view.RegisterInput.value = "";
  }

  UpdateTodoListData(node: HTMLElement) {
    const id = parseInt(node.dataset.key!) as number;
    const editInputData = (
      node.querySelector(".edit-input") as HTMLInputElement
    ).value;
    this.model.EditInputData = editInputData;
    this.model.updateTodoItem(id);
  }

  DeleteTodoListData(node: HTMLElement) {
    const id = parseInt(node.dataset.key!) as number;
    this.model.deleteTodoItem(id);
  }

  ToggleTodoListData(node: HTMLElement) {
    const id = parseInt(node.dataset.key!) as number;
    this.model.toggleTodoItem(id);
  }
}
