import { observable, observe } from "./observer.js";

export class Component {
  state;
  props;
  $el;

  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState()); // state를 관찰한다.
    observe(() => {
      // state가 변경될 경우, 함수가 실행된다.
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }
  template() {
    return "";
  }
  // 최신 상태를 가져와 문자열 템플릿 반환
  render() {
    this.$el.innerHTML = this.template();
  }
  // 이벤트 바인딩
  setEvent() {}
  // mounted의 로직은 무엇인가?
  mounted() {}
}
