export default class Controller {
  constructor(store, { todoInputFormView, todoListView }) {
    this.store = store;
    this.todoInputFormView = todoInputFormView;
    this.todoListView = todoListView;
    this.subscribeViewEvents();

    this.render();
  }

  subscribeViewEvents() {
    this.todoInputFormView.on("@submit", (event) => {
      const { value } = event.detail;
      this.store.addTodo({ content: value });
      this.render();
    });
  }

  render() {
    this.todoListView.show(this.store.todoList);
  }
}
