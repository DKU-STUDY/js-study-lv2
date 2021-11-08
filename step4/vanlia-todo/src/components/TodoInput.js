import { Component } from "../core/Component.js";
import { addTodo, store } from "../store.js";

const aaa = () => {
  const todoList = store.getState().todoList;
  const finLen = (todoList || []).filter((e) => e.isFinished).length;

  return `
  <div>완료/전체 ==>  ${finLen} / ${todoList.length}</div>
  `;
};

const TodoInputButton = () => {
  return `
    <button id="addNewTodo">새로운 TODO 추가하기</button>
    `;
};

export default class TodoInput extends Component {
  constructor($el, props) {
    super($el, props);
  }
  // template안의 overable로 (데코레이팅된)  getter 프로퍼티는
  // setter 프로퍼티 호출시,
  // template 의 최상위 외부함수를 호출하도록 observer는 notify 한다.
  template() {
    return `
      <div id="todoContainer">
        ${TodoInputButton()}
      </div>
    `;
  }

  handleAddNewTodo({ target }) {
    store.dispatch(
      addTodo({
        content: `new Todo~ ${new Date().toLocaleString()} `,
        isFinished: false,
      })
    );
  }

  setEvent() {
    const { $el } = this;
    $el.querySelector("#addNewTodo").addEventListener("click", (e) => {
      if (e.target) {
        this.handleAddNewTodo(e);
      }
    });
  }
}
