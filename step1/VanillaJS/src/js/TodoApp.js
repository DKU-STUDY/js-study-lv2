import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { newGuid } from './util/newGuid.js';
import { copyObj } from './util/copyObj.js';

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
      this.setState({ selectedItem: id });
    });

    this.addEvent('click', '.modify-cancel', () => {
      this.setState({ selectedItem: -1 });
    });

    this.addEvent('submit', `form[name='modify-form']`, (event) => {
      event.preventDefault();

      const content = event.target.querySelector('input').value;

      if (!content.trim()) {
        alert('Todo의 내용을 입력해주세요.');
        return;
      }

      const id = event.target.closest('li').dataset.id;
      const copiedState = copyObj(this.state);

      copiedState.todoItems.find((todo) => {
        if (todo.id === id) {
          todo.content = content;
          return true;
        }
        return false;
      });

      copiedState.selectedItem = -1;

      this.setState(copiedState);
    });

    this.addEvent('click', '.destroy', (event) => {
      const id = event.target.closest('li').dataset.id;
      const copiedState = copyObj(this.state);
      const todoIndex = copiedState.todoItems.findIndex((todo) => {
        if (todo.id === id) return true;
        return false;
      });
      copiedState.todoItems.splice(todoIndex, 1);
      this.setState(copiedState);
    });

    this.addEvent('click', '.toggle', (event) => {
      const id = event.target.closest('li').dataset.id;
      const copiedState = copyObj(this.state);

      copiedState.todoItems.find((todo) => {
        if (todo.id === id) {
          todo.isComplete = !todo.isComplete;
          return true;
        }
        return false;
      });

      this.setState(copiedState);
      console.log(this.state);
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
