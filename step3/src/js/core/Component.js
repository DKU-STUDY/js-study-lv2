import { observe, observable } from './observer.js';

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
    this.initState();
    observe(() => {
      this.render();
    });
  }

  initState() {}

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
