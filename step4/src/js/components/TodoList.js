import Component from '../core/Component.js';
import addEvent from '../utils/addEvent.js';

export default class TodoList extends Component {
  template() {
    const { todoItems, selectedItem } = this.props.data.getState();

    return `<ul class="todo-list">${todoItems
      .map((todoItem) => {
        if (selectedItem === todoItem.id) {
          return `
                  <li class="editing" data-id=${todoItem.id}>
                  <div class="view">
                    <form name="modify-form" method="post">
                      <input class="modify-todo" value='${todoItem.content}' />
                      <button type="submit">완료</button>
                      <button class="modify-cancel" type="button">취소</button>
                    </form>
                  </div>
                  </li>
                  `;
        }
        return `
              <li data-id=${todoItem.id} ${
          todoItem.isComplete ? `class="completed"` : ''
        }>
              <div class="view">
              <input class="toggle" type="checkbox" ${
                todoItem.isComplete ? 'checked' : ''
              }>
              <label>${todoItem.content}</label>
              <button class="modify" type="button">수정</button>
              <button class="destroy" type="button">삭제</button>
              </div>
              </li>
          `;
      })
      .join('')}</ul>`;
  }

  setEvent() {
    const { onoffEditMode, onEdit, onDelete, onToggle } = this.props;

    // 수정 버튼 클릭
    addEvent('click', '.modify', this.$target, (event) => {
      const id = event.target.closest('li').dataset.id;
      onoffEditMode(id);
    });

    // 수정 취소 버튼 클릭
    addEvent('click', '.modify-cancel', this.$target, () => {
      onoffEditMode(-1);
    });

    // 수정 submit
    addEvent('submit', `form[name='modify-form']`, this.$target, (event) => {
      event.preventDefault();
      const content = event.target.querySelector('input').value;
      if (!content.trim()) return alert('Todo의 내용을 입력해주세요.');
      const id = event.target.closest('li').dataset.id;
      onEdit(id, content);
    });

    // 삭제
    addEvent('click', '.destroy', this.$target, (event) => {
      const id = event.target.closest('li').dataset.id;
      onDelete(id);
    });

    // 토글
    addEvent('click', '.toggle', this.$target, (event) => {
      const id = event.target.closest('li').dataset.id;
      onToggle(id);
    });
  }
}
