import { Component } from "../core/Component.js";
import { toggleTodo, store } from "../store.js";

const TodoList = () =>
  `${Array.from(store.getState().todoList)
    .map((item) => TodoListItem(item))
    .join("")}
`;

const TodoListItem = (item) => `
<div> 
  <div>
   <input type="checkbox" data-id=${item.id} ${
  item.isFinished === true ? "checked" : ""
} /> TODO : ${item.content}
   </div>
</div>`;

const TodoSummary = () => {
  const todoList = store.getState().todoList;
  const finLen = (todoList || []).filter((e) => e.isFinished).length;

  return `
  <div>완료/전체 ==>  ${finLen} / ${todoList.length}</div>
  `;
};

export default class Todo extends Component {
  constructor($el, props) {
    super($el, props);
  }
  // template안의 overable로 (데코레이팅된)  getter 프로퍼티는
  // setter 프로퍼티 호출시,
  // template 의 최상위 외부함수를 호출하도록 observer는 notify 한다.
  template() {
    return `
      <ul id="todoListContainer">
        ${TodoList()}
        ${TodoSummary()}
      </ul>
    `;
  }

  handleCheckToggle({ target }) {
    store.dispatch(toggleTodo({ id: Number(target.dataset["id"]) }));
  }

  setEvent() {
    const { $el } = this;
    $el.querySelector("#todoListContainer").addEventListener("click", (e) => {
      if (e.target.type === "checkbox") {
        this.handleCheckToggle(e);
      }
    });
  }
}
