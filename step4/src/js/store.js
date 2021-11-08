import newGuid from './utils/newGuid.js';
import { createStore } from './core/Store.js';

const initState = {
  todoItems: [
    {
      id: newGuid(),
      content: '1번 투두',
      isComplete: false,
      createdAt: Date.now(),
    },
    {
      id: newGuid(),
      content: '2번 투두',
      isComplete: true,
      createdAt: Date.now(),
    },
    {
      id: newGuid(),
      content: '3번 투두',
      isComplete: false,
      createdAt: Date.now(),
    },
  ],
  selectedItem: -1,
};

const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_EDITMODE = 'SET_EDITMODE';

export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todoItems: [...state.todoItems, action.payload] };

    case 'SET_EDITMODE':
      return { ...state, selectedItem: action.payload };

    case 'EDIT_TODO':
      const copiedState = JSON.parse(JSON.stringify(state));
      copiedState.todoItems.find(
        (todo) => todo.id === action.payload.id
      ).content = action.payload.content;
      copiedState.selectedItem = -1;
      return { ...state, ...copiedState };

    case 'DELETE_TODO': {
      const copiedTodos = JSON.parse(JSON.stringify(state.todoItems));
      const todoIndex = copiedTodos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      copiedTodos.splice(todoIndex, 1);
      return { ...state, todoItems: [...copiedTodos] };
    }

    case 'TOGGLE_TODO': {
      const copiedTodos = JSON.parse(JSON.stringify(state.todoItems));
      const selectedTodo = copiedTodos.find(
        (todo) => todo.id === action.payload.id
      );
      selectedTodo.isComplete = !selectedTodo.isComplete;
      return { ...state, todoItems: [...copiedTodos] };
    }

    default:
      return state;
  }
});

export const addTodo = (payload) => ({ type: ADD_TODO, payload });
export const editTodo = (payload) => ({ type: EDIT_TODO, payload });
export const deleteTodo = (payload) => ({ type: DELETE_TODO, payload });
export const toggleTodo = (payload) => ({ type: TOGGLE_TODO, payload });
export const setEditmode = (payload) => ({ type: SET_EDITMODE, payload });
