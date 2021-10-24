import { qs } from "../helpers.js";
import View from "./View.js";

export default class TodoInputFormView extends View {
  constructor() {
    const tag = TodoInputFormView.name;
    console.log(`[${tag}] constructor`);
    super(qs("#todoInput"));

    this.inputElement = qs("[type=text]", this.element);
    this.bindEvents();
  }

  bindEvents() {
    this.on("submit", (e) => this.handleSubmit(e));
  }
  handleSubmit(e) {
    e.preventDefault();
    const { value } = this.inputElement;
    this.emit("@submit", { value });
    this.inputElement.value = "";
  }
}
