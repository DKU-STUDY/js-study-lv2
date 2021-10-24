# 1주차: TodoList 만들기

- [ ] Javascript Framework가 등장한 배경에 대해 조사하기 (5문장 요약)
- [ ] Vue와 React의 장단점에 대해 비교하기 (5가지)
- [x] Vue로 TodoList 만들기
    - [x] Vue CLI로 프로젝트 구성
    - [x] TodoList 만들기
        - [x] 목록
        - [x] 추가
        - [x] 수정
        - [x] 삭제
        - [x] 토글
- [x] React로 TodoList 만들기
    - [x] CRA(Create React App)로 프로젝트 구성
    - [x] TodoList 만들기
        - [x] 목록
        - [x] 추가
        - [x] 수정
        - [x] 삭제
        - [x] 토글
- [X] Vanilla Javascript로 TodoList 만들기
    - [X] 목록
    - [X] 추가
    - [X] 수정
    - [X] 삭제
    - [X] 토글

우선 vue.js는 이번에 처음 접해보았습니다. 아직 깊게 파고들어보지는 못했지만 리액트보다는 뭔가 조금 더 view쪽으로 다룰 수 있는 도구가 많아 보였습니다. react는 기본적인 기능만 구현하였고,
localStorage를 기본 state으로 parse해 오도록 하였지만 어쩐 일인지 기존에 Localstorage에 저장된 todoItem 중 첫번째 item id를 제대로 인식하지 못하여 수정,삭제가 불가능한
에러가 떴는데 아직 디버깅은 하지 못했습니다 ㅜㅜ 마지막으로는 바닐라 JS에서는 객체지향에 관한 글을 여러군데서 구글링을 해보면서 혼자 생각해보던 중에 MVC패턴이란 것을 발견하고 어느 정도의 영감? 을 받아서 한번
Model, Controller, View의 3가지 클래스로 구현...해보았지만, 사실 만들어놓고 보니 view와 controller의 역할은 대폭 축소된 것 같고, view는 렌더링에만 집중하고, model은
자료구조만 구현한다는 본래의 의미에서 벗어났다는 생각이 듭니다. 타입스크립트는 제가 공부를 해보고 싶어서 썼고, 딱히 진행하면서 크게 어려운 점은 없었습니다. 문제는 DOM쪽으로 넘어가거나 localstorage
쪽으로 가면 거의 무조건 as string...등으로 타입 고정을 시켜줘야 하는데, 거기서부터 사용이 불편하기 시작했지만 어쩔 때는 !(강제)를 써야한 적도 있었습니다. 다행히도 여러 임시방편으로 !를 쓰는 것만은
피할 수 있었습니다. 바닐라는 npm run start로 parcel로 실행하도록 했습니다. 바닐라 JS에 오류가 너무 많은데 지금 커밋 우선 하고 이번 주 내로 꼭 고치겠습니다.(중간고사ㅜㅜㅜ)
 