import { observe } from './observer.js';

export default class Component {
  $target; // target element
  state;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.setEvent();
  }

  setup() {
    observe(() => {
      this.render();
    });
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  mounted() {}
}
