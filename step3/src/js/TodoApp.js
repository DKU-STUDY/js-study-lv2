import Component from './core/Component.js';
import TodoHeader from './components/TodoHeader.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import newGuid from './utils/newGuid.js';
import { observable } from './core/observer.js';

export default class TodoApp extends Component {
  initState() {
    const sampleState = {
      todoItems: [
        observable({
          id: newGuid(),
          content: '1번 투두',
          isComplete: false,
          createdAt: Date.now(),
        }),
        observable({
          id: newGuid(),
          content: '2번 투두',
          isComplete: true,
          createdAt: Date.now(),
        }),
        observable({
          id: newGuid(),
          content: '3번 투두',
          isComplete: false,
          createdAt: Date.now(),
        }),
      ],
      selectedItem: -1,
    };

    this.state = observable(sampleState);
  }

  template() {
    return `
        <div class="header-container"></div>
        <div class="input-container"></div>
        <div class="list-container"></div>
    `;
  }

  mounted() {
    const $headerContainer = document.querySelector('.header-container');
    const $inputContainer = document.querySelector('.input-container');
    const $listContainer = document.querySelector('.list-container');
    new TodoHeader($headerContainer);
    new TodoInput($inputContainer, {
      onAdd: this.onAdd.bind(this),
    });
    new TodoList($listContainer, {
      data: this.state,
      onoffEditMode: this.onoffEditMode.bind(this),
      onEdit: this.onEdit.bind(this),
      onDelete: this.onDelete.bind(this),
      onToggle: this.onToggle.bind(this),
    });
  }

  onAdd(content) {
    const newItem = {
      id: newGuid(),
      content: content,
      createdAt: Date.now(),
      isComplete: false,
    };
    this.state.todoItems = [...this.state.todoItems, newItem];
  }

  onoffEditMode(id) {
    console.log('onEditMode click!***');
    this.state.selectedItem = id;
  }

  onEdit(id, content) {
    this.state.todoItems.find((todo) => todo.id === id).content = content;
    this.state.selectedItem = -1;
  }

  onDelete(id) {
    const copiedTodos = JSON.parse(JSON.stringify(this.state.todoItems));
    const todoIndex = copiedTodos.findIndex((todo) => todo.id === id);
    copiedTodos.splice(todoIndex, 1);
    this.state.todoItems = copiedTodos;
  }

  onToggle(id) {
    const selectedTodo = this.state.todoItems.find((todo) => todo.id === id);
    selectedTodo.isComplete = !selectedTodo.isComplete;
  }
}
