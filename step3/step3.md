# 요구사항 체크리스트

- [x] 이론
  - [x] 옵저버 패턴에 대해 조사하기
  - [x] Flux 패턴에 대해 조사하기
- [x] 실습
  - [x] Class Component에 옵저버 패턴 적용하기

# Observer 패턴

Observer 패턴(옵저버 패턴)은 객체의 상태 변화를 관찰하는 **관찰자들(Observer)**을 객체에 등록해놓고 객체의 상태가 변경될 때마다 객체가 직접 각 Observer들에게 변경됐다는 것을 **알리는** 디자인 패턴이다. (데이터가 바뀌었을때 반영을 해주는 것)

Observer 패턴을 다음과 같이 코드에 적용해볼 수 있다.

- 객체 - Store 혹은 State
- Observer들 - Component들

예를 들어, Store나 State가 변경되면 그 Store를 사용하는 Component도 변경되어야 한다. Store가 변경됐다는 걸 Store를 사용하는 컴포넌트에게 알리는 코드를 작성해야한다는 것이다.

- `observable` : 쉽게 말해 데이터(state)가 담긴다.
- `observe` : `observable`에 변화가 생기면 `observe`에 등록된 함수들(Observer들)이 실행된다.

# Flux 패턴

![https://user-images.githubusercontent.com/33214449/139672751-d692667e-cd54-426c-8075-33fc8fb9cdb2.png](https://user-images.githubusercontent.com/33214449/139672751-d692667e-cd54-426c-8075-33fc8fb9cdb2.png)

Flux 패턴의 특징은 **단방향으로 데이터가 흐른다**는 것이다. 이는 데이터 변화를 예측하기 쉽게 만든다.

state를 바꿀 때는 dispatch, commit 등으로만 바뀔 수 있도록 하는 것이 포인트이다.

[Redux의 Data Flow]

![https://user-images.githubusercontent.com/33214449/139673384-91f6c1c5-d692-4b3d-9da7-91a088b5d96b.png](https://user-images.githubusercontent.com/33214449/139673384-91f6c1c5-d692-4b3d-9da7-91a088b5d96b.png)

음식을 주문하는 상황을 예로 들면

- Action: 음식을 주문 (할 일을 명시)
- Dispatch: 재료창고(서버)에서 재료를 받아옴
- Reducer: 받은 주문을 만드는 과정을 담당하는 요리사 역할
