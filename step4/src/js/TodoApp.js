import Component from './core/Component.js';
import {
  addTodo,
  deleteTodo,
  editTodo,
  setEditmode,
  store,
  toggleTodo,
} from './store.js';
import TodoHeader from './components/TodoHeader.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import newGuid from './utils/newGuid.js';

export default class TodoApp extends Component {
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
      data: store,
      onoffEditMode: this.onoffEditMode,
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
    store.dispatch(addTodo(newItem));
  }

  onoffEditMode(value) {
    store.dispatch(setEditmode(value));
  }

  onEdit(id, content) {
    store.dispatch(editTodo({ id, content }));
  }

  onDelete(id) {
    store.dispatch(deleteTodo({ id }));
  }

  onToggle(id) {
    store.dispatch(toggleTodo({ id }));
  }
}
