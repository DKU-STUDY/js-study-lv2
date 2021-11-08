import { Component } from "./core/Component.js";
import { setA, setB, toggleTodo, store } from "./store.js";
import Todo from "./components/Todo.js";
import TodoInput from "./components/TodoInput.js";

const InputA = () =>
  `<input id="stateA" value="${store.getState().a}" size="5" />`;

const InputB = () =>
  `<input id="stateB" value="${store.getState().b}" size="5" />`;

const Calculator = () =>
  `<p>a + b = ${store.getState().a + store.getState().b}</p>`;

export class App extends Component {
  constructor($el, props) {
    super($el, props);
    this.handleCheckToggle = this.handleCheckToggle.bind(this);
  }
  // template안의 overable로 (데코레이팅된)  getter 프로퍼티는
  // setter 프로퍼티 호출시,
  // template 의 최상위 외부함수를 호출하도록 observer는 notify 한다.
  template() {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
      <hr/>
      <div id="TodoInput"></div>
      <div id="Todo"></div>
    `;
  }

  handleCheckToggle({ target }) {
    store.dispatch(toggleTodo({ id: Number(target.dataset["id"]) }));
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      // commit을 통해서 값을 변경시킨다.
      store.dispatch(setA(Number(target.value)));
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      // commit을 통해서 값을 변경시킨다.
      store.dispatch(setB(Number(target.value)));
    });
  }

  mounted() {
    const { $el } = this;
    new Todo($el.querySelector("#Todo"));
    new TodoInput($el.querySelector("#TodoInput"));
  }
}
