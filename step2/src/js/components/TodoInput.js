import Component from '../core/Component.js';
import addEvent from '../utils/addEvent.js';

export default class TodoInput extends Component {
  template() {
    return `
        <input class="new-todo" placeholder="오늘의 할 일" autofocus />
    `;
  }

  setEvent() {
    const { onAdd } = this.props;

    addEvent('keydown', '.new-todo', this.$target, (event) => {
      if (event.key !== 'Enter') return;

      const content = event.target.value;

      if (!content.trim()) return alert('Todo의 내용을 입력해주세요.');

      onAdd(content);
    });
  }
}
