/**
 ✅ 프록시는 특정 객체를 감싸, 읽기와 쓰기와 같은 객체에 가해지는 작업을 중간에 가로채는 객체이다.
 가로채진 작업은 Proxy자체에서 처리되기도 또는 원래 객체가 처리되도록 전달되기도 한다.
 */

// ⚠️? 접근자 프로퍼티와 , 프록시의 차이점
// 프로퍼티의 읽기/쓰기에 작업을 가로채는가 , 혹은 객체 자체의 읽기/쓰기에 작업을 가로채는 함수를 만드는가

//  문법
// let proxy = new Proxy(target, handler);
// *target : 감쌀 객체를 인자로 넣는다.
// *handler : 동작을 가로채는 트랩이 메서드가 담긴 객체를 인자로 받는다.

// ✅ 1. get 트랩으로 프로퍼티 기본값 설정하기

// eg) 기본값 0이  있는 배열
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 기본값
    }
  },
});

console.log(numbers[1]); // 1
console.log(numbers[123]); // 0 (해당하는 요소가 배열에 없으므로 0이 반환됨)

// eg) defaultDict

let dictionary = {
  Hello: "안녕하세요",
  Bye: "안녕히 가세요",
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) {
    // 프로퍼티를 읽기를 가로챕니다.
    if (phrase in target) {
      // 조건: 사전에 구절이 있는 경우
      return target[phrase]; // 번역문을 반환합니다
    } else {
      // 구절이 없는 경우엔 구절 그대로를 반환합니다.
      return phrase;
    }
  },
});

// 사전을 검색해봅시다!
// 사전에 없는 구절을 입력하면 입력값이 그대로 반환됩니다.
console.log(dictionary["Hello"]); // 안녕하세요
console.log(dictionary["Welcome to Proxy"]); // Welcome to Proxy (입력값이 그대로 출력됨)

// ✅ 2. set 트랩으로 프로퍼티 값 검증하기

// eg) 배열 유효성 검사
// ⚠️ 어떻게 push가 set으로 연결되고,
// ⚠️ 어떻게 push를 대처하는 로직을 아래와 같이 짤 수 있는가

let numbers2 = [];
numbers2 = new Proxy(numbers2, {
  // (*)
  set(target, prop, val) {
    // 프로퍼티에 값을 쓰는 동작을 가로챕니다.
    if (typeof val == "number") {
      target[prop] = val;
      //✅ true를 잊지 말고 반환해주세요. (규칙이다.)
      return true;
    } else {
      return false;
    }
  },
});

numbers2.push(1); // 추가가 성공했습니다.
numbers2.push(2); // 추가가 성공했습니다.
console.log("Length is: " + numbers2.length); // 2

// numbers2.push("test"); // Error: 'set' on proxy
// console.log("윗줄에서 에러가 발생했기 때문에 이 줄은 절대 실행되지 않습니다.");
