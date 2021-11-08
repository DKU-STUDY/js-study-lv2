// ✅ 대기중인 구독자 함수 ,
let currentObserver = null;

// 콜백함수를 등록한다. fn안에 observable 객체가 getter가 되는(참조가되는) 순간
// 그때의 맥락을 가진다.
const observe = (fn) => {
  // fn 함수를 구독자 함수로 등록을 하고, fn 함수를 호출해서
  // getter 클로저를 호출한다. 이때 다수의 getter함수에서 fn함수를 구독자로 등록된다.
  // 그리고 대기중인 구독자 함수를 제거한다.
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      // getter함수는 처음 obserable로 객체를 감쌀때, 클로저 함수가 된다 ?
      // 그래서 currentObserver 라는 자유변수를 가지고 있고,
      // getter가 호출되는 매번 자유변수가 null이 아니라면 해당 함수를 구독자로 등록을 한다.
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};

const state = observable({ a: 10, b: 20 });
// ✅ 신기한점, 어떻게 특정객체의 참조만 감지를 하고, 이를 notify 하는가?
observe(() => console.log(`a = ${state.a}`));
observe(() => console.log(`b = ${state.b}`));
observe(() => console.log(`a + b = ${state.a} + ${state.b}`));
// observe(() => console.log(`a * b = ${state.a} + ${state.b}`));
// observe(() => console.log(`a - b = ${state.a} + ${state.b}`));

state.a = 100;
state.b = 200;
