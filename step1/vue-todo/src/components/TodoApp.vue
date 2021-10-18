<template>
  <div>
    <h1 class="title">
      <!-- ✅ props from parents  using mustache  -->
      TodoApp - {{ title }}
    </h1>
    <!-- todo input -->
    <div class="todoInput">
      <form @submit="submitTodo">
        <label for="">New Todo: {{ todoInput }}</label>
        <!-- ✅ local state - data binding  -->
        <input type="text" v-model="todoInput" />
        <button @click="submitTodo">추가하기</button>
      </form>
    </div>
    <!-- todo list  -->
    <section>
      <ul>
        <!-- v-for 문법으로 순회, entries 와 비슷~ -->
        <li v-for="(todo, index) in todoList" :key="index">
          <div>
            <!-- 이벤트 핸들러 연결 -->
            <span class="pointer" @click="handleToggleTodo({ id: todo.id })">
              {{ todo.isFin ? "✅" : "🚀" }}
            </span>
            <span class="pointer" @click="handleDeleteTodo({ id: todo.id })">
              ❌
            </span>
            <TodoEditItem
              :id="todo.id"
              :content="todo.content"
              :onEdit="handleEditTodo"
            />
            <!-- 조건에 따라 클래스 바인딩 -->
            <span :class="{ isFin: todo.isFin }">
              {{ todo.content }}
            </span>
          </div>
          <!-- 자식컴포넌트 변수 전달 -->
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import TodoEditItem from "./TodoEditItem.vue";
// ✅ vue script
export default {
  name: "TodoApp",
  components: { TodoEditItem },
  //props from parents
  props: { title: String },
  // local state
  data() {
    return {
      todoInput: "",
      todoList: [
        {
          id: 0,
          content: "first Todo",
          isFin: true,
        },
        {
          id: 1,
          content: "second Todo",
          isFin: false,
        },
      ],
    };
  },
  // event handler
  methods: {
    submitTodo(e) {
      e.preventDefault();
      if (this.todoInput) this.handleAddTodo({ content: this.todoInput });
      this.todoInput = "";
    },
    getTodoIndex(id) {
      return this.todoList.findIndex((t) => t.id === id);
    },
    handleAddTodo({ content }) {
      this.todoList.push({ content, isFin: false, id: this.todoList.length });
    },
    handleDeleteTodo({ id }) {
      const targetIdx = this.getTodoIndex(id);
      if (targetIdx !== -1) {
        this.todoList.splice(targetIdx, 1);
      }
    },
    handleToggleTodo({ id }) {
      const targetIdx = this.getTodoIndex(id);
      if (targetIdx !== -1) {
        this.todoList[targetIdx].isFin = !this.todoList[targetIdx].isFin;
      }
    },
    handleEditTodo({ id, content }) {
      const targetIdx = this.getTodoIndex(id);
      if (targetIdx !== -1 && content) {
        this.todoList[targetIdx].content = content;
      }
    },
  },
};
</script>

<style>
.title {
  font-weight: 100;
}
.pointer {
  cursor: pointer;
}
.isFin {
  text-decoration: line-through;
}
</style>
