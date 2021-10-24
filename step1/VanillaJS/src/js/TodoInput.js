export default function ({ onAdd }) {
  const $todoInput = document.querySelector('.new-todo');

  $todoInput.addEventListener('keydown', (event) => this.addTodo(event));

  this.addTodo = (event) => {
    if (event.key !== 'Enter') return;

    const content = event.target.value;

    if (!content.trim()) {
      alert('Todo의 내용을 입력해주세요.');
      return;
    }

    onAdd(content);

    $todoInput.value = '';
  };
}
