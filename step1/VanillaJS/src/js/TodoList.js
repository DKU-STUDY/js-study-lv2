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
                    <input class="" value=${todoItem.content} />
                    <button type="submit">완료</button>
                    <button type="button">취소</button>
                  </form>
                </div>
                </li>
                `;
        }
        return `
            <li data-id=${todoItem.id}>
            <div class="view">
            <input class="toggle" type="checkbox" ${
              todoItem.isComplete ? 'checked' : ''
            }>
            ${todoItem.content}
            <button class="modify">수정</button>
            <button class="destroy">삭제</button>
            </div>
            </li>
        `;
      })
      .join('')}`;
  };

  const $todoList = document.querySelector('.todo-list');
  $todoList.innerHTML = this.template();
}
