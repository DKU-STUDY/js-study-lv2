// ✅ 접근자 프로퍼티  - 1 (리터럴 객체)

const person = {
  firstName: "kim",
  lastName: "dodo",
  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullname(fname) {
    [this.firstName, this.lastName] = fname.split(" ");
  },
};

console.log(person.fullname); // kim dodo
person.fullname = "banana apple";
console.log(person.fullname); //  banana apple

// ✅ 접근자 프로퍼티 - 2 (정의하기)

let a = 10;
const state = {};
Object.defineProperty(state, "a", {
  get() {
    console.log(`현재 a의 값은 ${a} 입니다.`);
    return a;
  },
  set(value) {
    a = value;
    console.log(`변경된 a의 값은 ${a} 입니다.`);
  },
});

// getter
console.log(`state.a = ${state.a}`); // state.a = 10
// setter
state.a = 100; //  변경된 a의 값은 100 입니다.
