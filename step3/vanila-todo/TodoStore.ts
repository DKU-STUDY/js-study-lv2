import Store from "./Core/Store";
import {Action, STORAGE_KEY} from "./Core/Constants";
import {Repository} from "./Core/Repository";
import {todoState} from "./Core/type";

export const store = new Store({

    mutations: {
        [Action.ADD](state, payload) {
            const newId = Math.max(...state.todoList.map(todo => todo.id)) + 1;
            state.todoList.push({id: newId, text: payload, completed: false})
        },
        [Action.EDIT](state, id) {
            state.selected = id;
        },
        [Action.DELETE](state, id) {
            const index = state.todoList.findIndex(todo => todo.id === id);
            state.todoList.splice(index, 1);
        },
        [Action.UPDATE](state, payload) {
            const item = state.todoList.find(todo => todo.id === state.selected);
            if (!item) {
                alert("failed to update");
                return false;
            }
            item.text = payload;
            state.selected = -1;
        },
        [Action.CANCEL](state) {
            state.selected = -1;
        },
        [Action.TOGGLE](state, id) {
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