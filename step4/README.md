# 4주차: Store 구성

- [x] Vuex 혹은 Redux 같은 중앙집중저장소 만들어서 적용하기
- [x] 렌더링 최적화하기

## 주제 오프닝

- 랜더링 최적화 : state를 변화시키는 set 함수들을 10번 실행시켜도, lazy하게 적용시켜 1번으로 최적화를 어떻게 할까?
- 가상돔을 사용해서 바뀐부분만 어떻게 수정을 할까?

## Flux 패턴이란?

Flux 패턴은 단뱡향 데이터 흐름을 특징으로, 양방향 데이터 흐름에서 나오는 버그를 최소화 하려는 의도  
Flux의 단방향 데이터 흐름 : Action -> Dispatcher -> Store -> View

## 랜더링 최적화 목적 및 방법

Case1. 똑같은 값으로 계속 변경을 요청(setter함수를 호출) 하는 경우

```
state.a = 1;
state.a = 1;
state.a = 1;
state.a = 1;// 마지막만 반영하고파
```

Sol1. setter함수에서 notify 함수를 호출 하기 전에 같은값인 경우 호출을 취소한다.

- 원시타입인 경우 , 값의 비교를 통해 호출을 취소
- 불변성을 어긴 객체는 주소값이 같고, **이곳의 로직상 주소값이 같은 경우** 변화을 알리지 않는다(notify호출 안함).
- 객체 타입인 경우, 깊은 값 비교를 할 수 있는데 eg) JSON.stringify 을 통해 해볼 수 있다.

Case1. 다른 값으로 계속 변경을 요청(setter함수를 호출) 하는 경우

```
state.a = 1;
state.a = 2;
state.a = 3;
state.a = 4;// 마지막만 반영하고파
```

## 질문

1. 사실 redux는 불변성 이라는 개념을 사용하고 있기 때문에 observable과 observe를 이용하는 것이 부자연스러울 수 있다.?
2. Component 의 mounted 매서드 - 하위 컴포넌트 랜더링할때 쓰는것이 맞는가?
3. createStore 의 subscribe는 observe로 대체한다. - 원래는 어떻게 구현할까?
4. observable(reducer()) 에서 initState 에 옵저버 기능이 추가된 getter/setter 접근자 프로퍼티 셋팅이 되었다.
   하지만 리덕스에서 리턴할때 새로운 객체를 반환하는데, 옵저버 기능이 추가된 접근자 프로퍼티가 왜 살아 있지?
5. JSON.stringify 외 더 좋은 방법
6. TODO만 조작하는데, 왜 a,b 도 notify 되어 rerendering 되는 거지?
