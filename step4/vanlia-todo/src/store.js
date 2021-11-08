import { createStore } from "./core/Store.js";

// 초기 state의 값을 정의해준다.
const initState = {
  a: 10,
  b: 20,
  todoList: [
    { id: 0, content: "study JS - ES6 ", isFinished: false },
    { id: 1, content: "study JS - Proxy ", isFinished: true },
  ],
};

// dispatch에서 사용될 type들을 정의해준다.
export const SET_A = "SET_A"; // unused
export const SET_B = "SET_B"; // unused
export const TOGGLE_TODO = "TOGGLE_TODO";
export const ADD_TODO = "ADD_TODO";

// reducer를 정의하여 store에 넘겨준다.
export const store = createStore((state = initState, action = {}) => {
  const payload = action.payload;
  switch (action.type) {
    case "SET_A":
      return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    case "TOGGLE_TODO": {
      const targetId = payload.id;
      const todoList = state.todoList;
      const targetIdx = todoList.findIndex((todo) => todo.id === targetId);
      if (targetIdx === -1) return state;
      todoList[targetIdx].isFinished = !todoList[targetIdx].isFinished;
      return { ...state, todoList: [...todoList] };
    }
    case "ADD_TODO": {
      const todoList = state.todoList;
      const newTodo = payload;
      newTodo.id = todoList.length + 1;
      if (!newTodo) return state;
      return { ...state, todoList: [...todoList, newTodo] };
    }

    default:
      return state;
  }
});

// reducer에서 사용될 action을 정의해준다.
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });
export const toggleTodo = (payload) => ({ type: TOGGLE_TODO, payload });
export const addTodo = (payload) => ({ type: ADD_TODO, payload });
