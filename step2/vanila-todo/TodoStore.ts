import Store from "./Core/Store";
import {actions, STORAGE_KEY} from "./Core/Constants";

export const store = new Store({
    state: JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {
        selected: -1,
        todoList: [{
            id: 1,
            text: "hi",
            completed: false
        }]
    },
    mutations: {
        [actions.ADD](state, payload) {
            const newId = Math.max(...state.todoList.map(todo => todo.id)) + 1;
            state.todoList.push({id: newId, text: payload, completed: false})
        },
        [actions.EDIT](state, id) {
            state = {...state, selected: id}
        },
        [actions.DELETE](state, id) {
            const index = state.todoList.findIndex(todo => todo.id === id);
            state.todoList.splice(index, 1);
        },
        [actions.UPDATE](state, payload) {
            const item = state.todoList.find(todo => todo.id === state.selected);
            if (!item) {
                alert("failed to update");
                return false;
            }
            item.text = payload;
            state.selected = -1;
        },
        [actions.CANCEL](state) {
            state = {...state, selected: -1}
        },
        [actions.TOGGLE](state, id) {
            const item = state.todoList.find(todo => todo.id === id);
            if (!item) {
                alert("failed to toggle");
                return false;
            }
            item.completed = !item.completed;
        }
    },
    actions: {},
})