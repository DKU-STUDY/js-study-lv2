# 4주차: Store 구성

- [x] Vuex 혹은 Redux 같은 중앙집중저장소 만들어서 적용하기
- [ ] 렌더링 최적화하기

## 주제 오프닝

- 랜더링 최적화 : state를 변화시키는 set 함수들을 10번 실행시켜도, lazy하게 적용시켜 1번으로 최적화를 어떻게 할까?
- 가상돔을 사용해서 바뀐부분만 어떻게 수정을 할까?

## 질문

1. 사실 redux는 불변성 이라는 개념을 사용하고 있기 때문에 observable과 observe를 이용하는 것이 부자연스러울 수 있다.?
2. Component 의 mounted 매서드 - 하위 컴포넌트 랜더링할때 쓰는것이 맞는가?
3. createStore 의 subscribe는 observe로 대체한다. - 원래는 어떻게 구현할까?
4. observable(reducer()) 에서 initState 에 옵저버 기능이 추가된 getter/setter 접근자 프로퍼티 셋팅이 되었다.
   하지만 리덕스에서 리턴할때 새로운 객체를 반환하는데, 옵저버 기능이 추가된 접근자 프로퍼티가 왜 살아 있지?
