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
