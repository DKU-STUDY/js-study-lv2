# 1주차: TodoList 만들기

## [✅] Javascript Framework가 등장한 배경에 대해 조사하기 (5문장 요약)

초기 웹은 사용자 요청에 맞게 정적 HTML을 브라우저에 되돌려 주었다.

> 변경 사항 업데이트 시 html 코드를 직접 수정하는 문제점

JAVA,JSP를 사용한 동적 웹페이지가 등장. 서버에서 동적 데이터로 html을 만드는 방식

> 일부 데이터만 변경해도 전체를 랜더링해야하는 문제점 (비효율적)

AJAX의 등장. 새로고침없이 일부분을 업데이트를 할 수 있다 (최초 SPA G-mail 탄생)

> 1세대 프레임워크 AngularJS, Backbone.js - 양방향 데이터 흐름, MVC 및 MVVM 패턴 적용
> 2세대 프레임워크 ReactJS,VueJS - 단방향 데이터, virtualDOM (변경점 관리 역할)

- 참고)
  초기 웹 사용자는 NetScape와 IE 둘 중 하나를 선택 (NetScape - 86% 점유율)
  MS에서 IE를 운영체제와 통합하여 IE 점유율이 75%까지 상승

### ref

https://heecheolman.tistory.com/38

## [✅] Vue와 React의 장단점에 대해 비교하기 (5가지)

정리

Vue 의 장점은

- Template 과 Render Function 을 모두 사용할 수 있는 옵션
- 간편한 Syntax 와 프로젝트 설정
- 빠른 렌더링과 더 작은 용량

React 의 장점은

- 큰 규모에서 더 빛을 발하고, 테스팅이 수월
- Web 과 Native 앱 개발에 모두 사용 가능
- 더 큰 개발자 생태계에서 오는 많은 레퍼런스와 도구들

---

1. Vue Template, React JSX (render)

Template 은 전통적인 웹개발 패러다임으로 입문(혹은 이주)가 쉽다.  
Functionality 동작과 Layout이 분리할 수 있음  
Pug과 같은 전처리기 추가 가능

---

Template은 추가적인 구문 학습이 필요하다.  
render는 쉽게 디버깅 및 테스팅이 가능

- \*참고 Vue (2.x) 부터 Template, render() 모두 지원

2. Transpliation, 불변성

- Vue는 변환작업 없이 바로 브라우저에서 동작하지만 React는 JSX와 ES6에 많이 의존한다.
- Vue에서 데이터는 변경할 수 있고 reactivity system 이 모든 상태를 모니터링하여 다시 랜더링 한다.
- 이는 React 보다 빠르고 더 효율적,
- 그러나 속성 추가 및 삭제 그리고 특정 배열에 대한 변경을 감지하지 못해 Vue API를 이용해야함

3. 속도와 용량의 차이

- 1개 list (1만개 items) 를 100 번 렌더링시 Vue가 대략 2배 빠르다(평균치).
- 현재 릴리즈된 Vue 의 라이브러리 크기가 25.6KB 인 반면
- 동일한의 React 라이브러리 (React DOM 37.4KB + React Addons Library 11.4KB) 의 크기는 48.8KB

4. 큰 규모의 앱을 만드신다면 React

Vue.

- 앱의 규모가 점점 더 커질 때 Vue는
- Template 은 런타임 에러가 나오기 쉽고, 테스트하기가 어려우며 재구조화 하기 어렵다.

React.

- React 의 렌더링 시스템이 더 정밀한 구성이 가능
- shallow 렌더링 과 같은 기능제공.
- 테스팅 도구와도 결합할 수 있어, 테스트하기 수월하고 더 유지보수 가능한 코드를 만들 수 있죠.

5. 더 큰 개발 생태계를 원한다면 React

- NPM 다운로드수 React 250만, Vue 22.5만
- Facebook에서 시작된 React와 1인 개발(+후원)으로 만든 Vue.

### ref

https://joshua1988.github.io/web_dev/vue-or-react/

## [✅] Vue로 TodoList 만들기

- [✅] Vue CLI로 프로젝트 구성
- [✅] TodoList 만들기
  - [✅] 목록
  - [✅] 추가
  - [✅] 수정
  - [✅] 삭제
  - [✅] 토글

### 프로젝트 생성 & 셋업

npm install --global @vue/cli  
vue create vue-todo  
(vue version 2를 선택)
yarn add bootstrap
yarn serve

### ref video

https://www.youtube.com/watch?v=8AlnTd31KUk
https://www.youtube.com/watch?v=DmgAvJhK3YE&list=PLpJDjPqxGWGrkyxxavs2oW-SK3v_8VLwa

## [✅] React로 TodoList 만들기

- [✅] CRA(Create React App)로 프로젝트 구성
- [✅] TodoList 만들기

  - [✅] 목록
  - [✅] 추가
  - [✅] 수정
  - [✅] 삭제
  - [✅] 토글

npx create-react-app react-todo

## [ ] Vanilla Javascript로 TodoList 만들기

- [ ] 목록
- [ ] 추가
- [ ] 수정
- [ ] 삭제
- [ ] 토글
