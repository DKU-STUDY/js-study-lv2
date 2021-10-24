export default function ({ state }) {
  this.template = () => {
    const { todoItems, selectedItem } = state;

    return `${todoItems
      .map((todoItem) => {
        if (selectedItem === todoItem.id) {
          return `
                <li class="editing" data-id=${todoItem.id}>
                <div class="view">
                  <form name="modify-form" method="post">
                    <input class="modify-todo" value=${todoItem.content} />
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
      .join('')}`;
  };

  const $todoList = document.querySelector('.todo-list');
  $todoList.innerHTML = this.template();
}
