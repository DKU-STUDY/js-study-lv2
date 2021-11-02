import Component from './core/Component.js';
import TodoHeader from './components/TodoHeader.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import newGuid from './utils/newGuid.js';

export default class TodoApp extends Component {
  init() {
    this.state = {
      todoItems: [
        {
          id: newGuid(),
          content: '1번 투두',
          isComplete: false,
          createdAt: Date.now(),
        },
        {
          id: newGuid(),
          content: '2번 투두',
          isComplete: true,
          createdAt: Date.now(),
        },
        {
          id: newGuid(),
          content: '3번 투두',
          isComplete: false,
          createdAt: Date.now(),
        },
      ],
      selectedItem: -1,
    };
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

    this.setState({ todoItems: [...this.state.todoItems, newItem] });
  }

  onoffEditMode(id) {
    this.setState({ selectedItem: id });
  }

  onEdit(id, content) {
    const data = JSON.parse(JSON.stringify(this.state));

    data.todoItems.find((todo) => todo.id === id).content = content;
    data.selectedItem = -1;

    this.setState(data);
  }

  onDelete(id) {
    const data = JSON.parse(JSON.stringify(this.state));
    const todoIndex = data.todoItems.findIndex((todo) => todo.id === id);
    data.todoItems.splice(todoIndex, 1);
    this.setState(data);
  }

  onToggle(id) {
    const data = JSON.parse(JSON.stringify(this.state));

    const todoData = data.todoItems.find((todo) => todo.id === id);
    todoData.isComplete = !todoData.isComplete;

    this.setState(data);
  }
}
