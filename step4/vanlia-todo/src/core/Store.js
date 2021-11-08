import { observable } from "./observer.js";
/**
 * code src : https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_7-redux-%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5
 */
export const createStore = (reducer) => {
  // reducer가 실행될 때 반환하는 객체(state)를 observable로 만들어야 한다.
  // + reducer가 다루는 state의 getter 프로퍼티들을 notify 함수 등ㄹ록
  const state = observable(reducer());
  // getState가 실제 state를 반환하는 것이 아니라 frozenState를 반환하도록 만들어야 한다.
  // + getState는 보호되어야 한다.
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key], // get만 정의하여 set을 하지 못하도록 만드는 것이다.
    });
  });
  // dispatch로만 state의 값을 변경할 수 있다.
  const dispatch = (action) => {
    const newState = reducer(state, action);
    for (const [key, value] of Object.entries(newState)) {
      // state의 key가 아닐 경우 변경을 생략한다.
      if (!state[key]) continue;
      state[key] = value;
    }
  };
  const getState = () => frozenState;
  // subscribe는 observe로 대체한다.
  return { getState, dispatch };
};
