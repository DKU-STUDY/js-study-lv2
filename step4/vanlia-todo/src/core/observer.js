let currentObserver = null;

// ✅ requestAnimationFrame 을 활용한 debounce 로직
const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const observe = (fn) => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        console.log("setter !", _value, value);
        // (최적화.1-1) 값(혹은 주소)가 같다면 업데이트 안함
        if (_value === value) return;
        // TODO DEBUG ❌ ==> 왜 객체 stringify 가 작동안하지?
        // (최적화.1-2) 객체의 string값이 같다면 업데이트 안함
        // if (JSON.stringify(_value) === JSON.stringify(value)) return;

        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};
