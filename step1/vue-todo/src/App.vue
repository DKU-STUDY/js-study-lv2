<template>
  <div id="app">
    <div>
      <div>
        <h1>Todo app</h1>
        <form @submit.prevent="addTodo()">
          <input type="text" v-model="userInput"/>
          <input type="submit" value="add"/>
        </form>
        <div>
          <ul>
            <li v-for="(todo,index) in todoList" v-bind:key="todo">
              <div v-if="index===selected">
                <input type="text" v-model="todo.text">
                <input type="submit" value="update" @click="updateTodo(index, todo.text)"/>
              </div>
              <div v-else>
                <input type="checkbox" @change="toggleTodo(todo)"/>
                <span>
            {{ todo.text }}
            </span>
                <button type="button" @click="deleteTodo(index)">delete</button>
                <button type="button" @click="editTodo(index, todo)">Edit</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";


@Options({
  data() {
    return {
      selected: -1,
      userInput: "",
      todoList: [],

    }
  },

  methods: {
    addTodo() {

      this.todoList.push({
        id: this.todoList.length + 1,
        text: this.userInput,
        completed: false,

      });
      this.userInput = "";
    },
    toggleTodo(todo: any) {
      todo.completed = !todo.completed
    },
    deleteTodo(index: number) {
      this.todoList.splice(index, 1);
    },
    editTodo(index: number, todo: any) {
      this.selected = index;
      this.todo = todo;
    },
    updateTodo(index: number, text: string) {
      this.todoList.splice(this.selected, 1, this.todo);
      this.selected = -1;
    }

  },
  components: {},
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
