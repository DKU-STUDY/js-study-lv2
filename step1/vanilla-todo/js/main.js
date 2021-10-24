import Controller from "./Controller.js";
import storage from "./storage.js";
import Store from "./Store.js";
import TodoInputFormView from "./views/TodoInputFormView.js";
import TodoListView from "./views/TodoListView.js";

const tag = "[main]";

document.addEventListener("DOMContentLoaded", main);
function main() {
  console.log(`[${tag}]`);
  const store = new Store(storage);
  const views = {
    todoInputFormView: new TodoInputFormView(),
    todoListView: new TodoListView(),
  };
  new Controller(store, views);
}
