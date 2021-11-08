# 2주차: Web Component 구성

- [ ] 이론
    - [X] ES5의 Class와 ES6의 Class의 차이점에 대해 조사하기 (5가지)
    - [X] ES6의 Class만이 가지고 있는 특징과 장점에 대해 조사하기 (3가지)
- [ ] 실습
    - [X] Component Class 만들기
        - [X] Vue와 React를 참고하여 자유롭게 구성해보기
        - [X] DOM 사용 최소화화기
            - [] State(혹은 data)가 변할 때 만 렌더링이 되도록 구성
    - [X] TodoList 리팩토링

### es5/ es6의 클래스 문법의 비교

자바스크립트는 __프로토타입__ 기반의 객체지향 언어로, 기본적으로 강력한 객체지향 프로그래밍 능력을 가지고 있다. 프로토타입 기반 프로그래밍은 클래스가 필요없는(class-fre)
객체지향 프로그래밍 스타일로 프로토타입 체인과 클로저 등으로 객체 지향 언어의 상속 및 캡슐화 등을 구현할 수 있다.

ES5에서는 생성자 함수와 프로토타입, 클로저를 사용하여 객체 지향 프로그래밍을 구현하였다. 하지만 클래스 기반 언어에 익숙한 프로그래머들에게는 혼란스러울 수 있는 문법을 가지고 있으며, 이에 ES6에서는 클래스
문법을 도입하여 기존 클래스 기반 언어에 익숙한 프로그래머들에가 보다 빠르게 학습할 수 있는 간단명료한 문법을 제시하고 있다. 그렇다고 ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새로운
객체지향 모델을 제공하는 것은 아니다. 사실 클래스도 함수이며 기존 프로토타입 기반 패턴의 문법적 설탕이라고 볼 수도 있다. 다만 클래스와 생성자 함수가 정확히 일치하게 동작하지는 않으며, 단순히 문법적 설탕으로 볼
수 없다는 견해도 있다.

class 연산자는 new 연산자를 사용하여 마치 생성자 함수와 같이 인스턴스를 생성할 수 있다.new 연산자로 호출하는 이름은 클래스 명이 아니라 생성자(constructor)이며, 선언식으로 정의했을 경우에만
클래스명과 생성자(constructor)명이 일치한다. *constructor*는 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 메소드로, ES5에서는 일반 함수가 new 연산자와 호출 시 생성자 함수로써
동작했지만,ES6의 클래스 문법에서는 class 키워드로 정의된 클래스의 본문 영역 내에 *constructor* 키워드를 통해 생성자를 정의한다. es5에서는 프로토타입 메서드 및 스태틱 메서드도 생성자 함수로
호출할 수 있었다.

```
var ES5 = function(name){
    this.name = name;
}
ES5.staticMethod = function(){ //static 메소드
    return this.name+'staticMethod'
}
ES5.prototype.method = function(){ //프로토타입 메소드
   return this.name+'method'
}
var es5Instance = new ES5('es5');
console.log(ES5.staticMethod()); //ES5 staticMethod
console.log(es5Instance.method()); //es5 method
var methodObj = new ES5.prototype.method(); //new 연산자와 함께 생성자 함수로써 사용가능
var staticObj = new ES5.staticMethod();
console.log(methodObj); //es5 method
console.log(staticObj); //ES5 staticMethod
```

하지만 ES6의 클래스 문법에서는 불가능하다.

```
var ES6 = class{
    constuctor(name){ //ES5의 생성자 함수와 동일한 역할
        this.name= name;
    } //메서드와 다음 메서드 사이에는 콤마로 구분하지 않음
    static staticMethod(){
        return this.name + 'staticMethod';
    }
    method(){ 
        return this.name+'method';
    }
}
var methodObj = new ES6.prototype.method(); 
var staticObj = new ES6.staticMethod();
console.log(methodObj); //TypeError
console.log(staticObj); //TypeError
```

ES6에서는 *키워드(keyword)*로 상속, 프로토타입 및 스태틱 메서드 등을 보다 더 간단하게 구현한다.

### class field와 *constructor*키워드

ES6의 클래스 문법에서는 __클래스 필드__(class field)를 가진다. 클래스 필드는 클래스 내부의 캡슐화된 변수를 말하며, 데이터 멤버 또는 멤버 변수라고도 부른다. 클래스 필드는 인스턴스의 프로퍼티 또는
정적 프로퍼티가 될 수 있다. 쉽게 말해, 자바스크립트의 생성자 함수에서 this에 추가한 프로퍼티를 클래스 기반 객체지향 언어에서는 클래스 필드라고 부른다.
*constructor*는 클래스 내에 한 개만 존재할 수 있으며 만약 2개 이상의 *constructor*를 포함하면 *SyntaxError*가 발생한다. 인스턴스를 생성할 때 *new* 연산자와 함께 호출한 것이
바로 constructor이며, constructor의 파라미터에 전달한 값은 클래스 필드에 할당한다.
*constructor*는 생략 가능하며, constructor를 생략하면 클래스에   `constructor(){}`를 포함한 것과 동일하게 동작한다. 즉, 빈 객체를 생성한다. 따라서 인스턴스에 프로퍼티를
추가하려면 인스턴스를 생성한 이후, 프로퍼티를 동적으로 추가해야 한다.
*constructor*는 인스턴스의 생성과 동시에 클래스 필드의 생성과 초기화를 실행한다. 따라서 클래스 필드를 초기화해야 한다면 *constructor*를 생략해서는 안된다
*constructor*내부에서 선언한 클래스 필드는 클래스가 생성할 인스턴스를 가리키는 this에 바인딩한다. 이로써 클래스 필드는 클래스가 생성할 인스턴스의 프로퍼티가 된다.

    private field를 사용하면 인스턴스에서 참조하지 못하게 할 수도 있다.

### 정적(*static*) 메소드

클래스를 위한 정적(static)메소드를 정의할 때 *static*키워드를 사용한다. 정적 메소드는 클래스의 인스턴스가 아닌 클래스 이름으로 호출한다. 클래스의 정적 메소드는 인스턴스로 호출할 수 없으며, 이는 정적
메소드는 this를 사용할 수 없다는 것을 의미한다. 일반 메소드 내부에서 this는 클래스의 인스턴스를 가리키며, 메소드 내부에서 this를 사용한다는 것은 곳 클래스의 인스턴스의 생성을 전제로 한다. 이는 달리
말하면 메소드 내부에서 this를 사용할 필요가 없는 메소드는 정적 메소드로 만들 수 있다는 뜻이다. 정적 메소드는 Math 객체의 메소드 처럼 어플리케이션 전역에서 사용할 유틸리티 함수를 생성할 때 주로 사용한다.

함수 객체(자바스크립트의 함수는 객체이다)는 *prototype* 프로퍼티를 갖는데 이는 일반 객체와는 다른 점이며 일반 객체는 *prototype* 프로퍼티를 가지지 않는다.

함수 객체만이 가지고 있는 *prototype* 프로퍼티는 함수 객체가 생성자로 사용될 때, 이 함수를 통해 생성된 객체의 부모 역할을 하는 프로토타입 객체를 가리킨다. 정적 메소드는 생성자 함수의 메소드이고, 일반
메소드는 자신의 프로토타입 객체의 메소드이다. 따라서, 정적 메소드는 인스턴스에서 호출할 수 없다.

### 클래스 상속과 extends 키워드

클래스 상속(Class Inheritance)은 코드 재사용 관점에서 매우 유용하다. 새롭게 정의할 클래스가 기존에 있는 클래스와 매우 유사하다면, 상속을 통해 그대로 사용하되 다른 점만 구현하면 된다. 코드
재사용은 개발 비용을 현저하게 줄일 수 있는 잠재력이 있으므로 매우 유용하다.

extends 키워드는 부모 클래스(base class)를 상속받는 자식 클래스(sub class)를 정의할 때 사용한다. 상위 클래스가 가지고 있는 메소드를 하위 클래스가 재정의하여 사용하는 *오버라이딩* 을
통해, 자식클래스가 부모클래스의 메소드 등을 그대로 사용하거나 재정의할 수 있다. 자바스크립트는 매개변수의 타입 또는 갯수가 다른 같은 이름의 메소드를 구현하는 *오버로딩*은 지원하지 않지만, arguments객체를
통하여 구현할 수는 있다.

### 부모 클래스를 참조하는 *super* 키워드

super 키워드는 부모 클래스를 참조(Reference)할 때 또는 부모 클래스의 constructor를 호출할 때 사용한다.

1. super 메소드는 자식 class의 constructor 내부에서 부모 클래스의 constructor(super-constructor)를 호출한다. 즉, 부모 클래스의 인스턴스를 생성한다. 자식 클래스의
   constructor에서 super()를 호출하지 않으면 this에 대한 참조 에러(ReferenceError)가 발생한다. 이것은 super 메소드를 호출하기 이전에는 this를 참조할 수 없음을 의미한다.
2. super 키워드는 부모 클래스(Base Class)에 대한 참조이다. 부모 클래스의 필드 또는 메소드를 참조하기 위해 사용한다.

이처럼 자바스크립트는 키워드를 통해 프로토타입 상속을 구현할 수 있다.


