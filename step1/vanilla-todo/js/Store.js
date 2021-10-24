export default class Store {
  constructor(storage) {
    if (!storage) throw "storage needed";
    this.storage = storage;
    this.todoList = storage.todoList;
  }

  addTodo({ content }) {
    this.todoList.push({
      id: this.todoList.length + 1,
      isFin: false,
      content,
    });
  }
  deleteTodo({ id }) {
    const index = findTodoIndex(id);
    if (index === -1) throw "no todo element";
    this.todoList.splice(index, 1);
  }
  toggleTodo() {}
  updateTodo() {}
  findTodoIndex(id) {
    return this.todoList.findIndex((t) => t.id === id);
  }
}
