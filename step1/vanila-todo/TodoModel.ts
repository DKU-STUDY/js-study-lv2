import TodoView from "./TodoView";
import TodoController from "./TodoController";

type todoItem = {
  id: number;
  text: string;
  completed: boolean;
};
type stateProp = {
  selected: number;
  todoList: todoItem[];
};
export default class TodoModel {
  currentInputData: string;
  editInputData: string;
  Index: number;
  state: stateProp | null;
  view: TodoView;
  controller: TodoController;

  constructor() {
    this.view = new TodoView(this);
    this.controller = new TodoController(this);
    this.init();
  }

  init() {
    this.currentInputData = "";
    this.editInputData = "";
    this.Index = 0;
    this.state = JSON.parse(localStorage.getItem("state")) || {
      selected: -1,
      todoList: [
        {
          id: 0,
          text: "text",
          completed: false,
        },
      ],
    };
    this.view.render();
    this.controller.registerEventListener();
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    localStorage.setItem("state", JSON.stringify(this.state));
    this.view.render();
  }

  get CurrentInputData() {
    return this.currentInputData;
  }

  set CurrentInputData(data: string) {
    this.currentInputData = data;
  }

  get EditInputData() {
    return this.editInputData;
  }

  set EditInputData(data: string) {
    this.editInputData = data;
  }

  get index() {
    return this.Index;
  }

  set index(id) {
    this.Index = id;
  }

  addTodoItem() {
    this.index = Math.max(...this.state.todoList.map((todo) => todo.id)) + 1;
    const newTodo = {
      id: this.index,
      text: this.CurrentInputData,
      completed: false,
    };

    this.setState({ todoList: [...this.state.todoList, newTodo] });
  }

  deleteTodoItem(id: number) {
    const index = this.state.todoList.findIndex((todo) => todo.id === id);
    const newList = [...this.state.todoList];
    newList.splice(index, 1);
    this.setState({ todoList: newList });
  }

  updateTodoItem(id: number) {
    const index = this.state.todoList.findIndex((todo) => todo.id === id);
    const newList = [...this.state.todoList];
    newList[index].text = this.EditInputData;
    this.setState({ todoList: newList });
  }

  toggleTodoItem(id: number) {
    const index = this.state.todoList.findIndex((todo) => todo.id === id);
    const newList = [...this.state.todoList];
    newList[index].completed = !newList[index].completed;
    this.setState({ todoList: newList });
  }

  toggleEditMode(id: number) {
    this.setState({ selected: id });
  }
}
