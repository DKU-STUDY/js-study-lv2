import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { newGuid } from './util/newGuid.js';

export default function () {
  this.$target = document.querySelector('.todoapp');
  // todolist는 부모 컴포넌트인 TodoApp에서 직접 관리
  this.state = {
    todoItems: [
      {
        id: '619FD6AE-242A-4A8F-AF6A-8A0522341384',
        content: '투두1',
        createdAt: Date.now(),
        isComplete: false,
      },
      {
        id: newGuid(),
        content: '투두2',
        createdAt: Date.now(),
        isComplete: false,
      },
      {
        id: newGuid(),
        content: '투두3',
        createdAt: Date.now(),
        isComplete: false,
      },
    ],
    selectedItem: -1,
  };

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.render = () => {
    new TodoList({
      state: this.state,
    });
    console.log('render!');
  };

  this.init = () => {
    this.render();
    this.setEvent();
  };

  this.setEvent = () => {
    this.addEvent('click', '.modify', (event) => {
      const id = event.target.closest('li').dataset.id;
      // selectedItem 값 변경
      this.setState({ selectedItem: id });
    });
  };

  this.addEvent = (eventType, selector, callback) => {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  };

  new TodoInput({
    onAdd: (content) => {
      const newItem = {
        id: newGuid(),
        content: content,
        createdAt: Date.now(),
        isComplete: false,
      };

      this.setState({ todoItems: [...this.state.todoItems, newItem] });
    },
  });

  this.init();
}
