## 1. 중앙 집중식 상태관리

FE 개발에서 가장 중요한것은 상태관리이다.

- 상태관리 state에 따라서 DOM을 리랜더링 하기 때문

## 2. Observer Pattern에 대해 이해하기

패턴의 메시지 : designing decoupled systems 유용하다.  
하지만, 느슨한 게시자-구독자 사이의 관계 덕분에, 구독자 프로세스가 어떤 오류로 문제가 생겨도 게시자는 이를 알 방법이 없다.

[!https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/1708px-Observer.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/1708px-Observer.svg.png)

옵저버 패턴의 구현

1. 옵저버 패턴에서는 정보를 구독하는 구독자(subscribe,observer), 정보를 알려주는 퍼블리셔(subject)가 있다.
2. 여기서는 observer와 subject라는 용어로만 사용하겠다. pubsub 패턴의 pub(퍼블리셔) sub(구독자)도 비슷한 맥락으로 이해가 가능하다.
3. subject는 정보를 발행하고 이를 notify하기 위해서는 여러 observer들을 알고 있어야 한다.  
   여기서 subject는 observer들을 aggregation 해야 함을 알 수 있다. 즉, 구독자 객체 주소를 배열로 가지고 있어야 한다.

4. 그러면 정보가 발행 후 구독자에게 notify 를 아직 할 수는 없다. Notify를 하기 위한 구독자들의 공통 인터페이스를 구현해야 한다.
5. 그래서 클래스 다이어그램에서는 notify가 함수가 있는 인터페이스와 concrete observer가 있다.

### 참고) Differences Between The Observer And Publish/Subscribe Pattern

The Publish/Subscribe pattern however uses a topic/event channel which sits between the objects wishing to receive notifications (subscribers) and the object firing the event (the publisher).

옵저버 패턴은 구체적인 구독자들을 등록하는 과정을 거처 알림을 준다.  
하지만 pubsub 패턴은 중간에 채널을 두어 구독자가 누구든지 상관하지 않고 채널에 있는 (없을지라도) 구독자에게 알림을 준다.  
이는 subscriber and publisher 사이의 의존성을 제거한다.

https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript

### 옵저버 패턴의 코드 (IIFE)

```js
// ObserverList 객체 정의
const ObserverList = (function () {
  function ObserverList() {
    this.observerList = [];
  }

  ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
  };

  ObserverList.prototype.count = function () {
    return this.observerList.length;
  };

  ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  };

  ObserverList.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i;
      }
      i++;
    }

    return -1;
  };

  ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
  };

  return ObserverList;
})();

// Subject 객체 정의
const Subject = (function () {
  function Subject() {
    // 구독자 리스트를 배열로 선언해도 되지만, 리스트를 한번더 추상화를 했다.
    this.observers = new ObserverList();
  }

  Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer);
  };

  Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
  };

  Subject.prototype.notify = function (context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context);
    }
  };
  return Subject;
})();

// The Observer 객체 정의
const Observer = (function () {
  function Observer(props) {
    this.name = props.name || "observerName";
  }
  Observer.prototype.update = function (payload) {
    console.log(`${this.name} is recived payload`, payload);
  };
  return Observer;
})();

// main test - 2명의 구독자가 payload를 받게 된다.
const subject = new Subject();
subject.addObserver(new Observer({ name: "ob1" })); // ob1 subscribe
subject.addObserver(new Observer({ name: "ob2" })); // ob2 subscribe

subject.notify({ name: "dodo" });
```
