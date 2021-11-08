export enum Action {
  
    ADD = "AddTodo",
    UPDATE = "UpdateTodo",
    EDIT = "EditTodo",
    TOGGLE = "ToggleTodo",
    DELETE = "DeleteTodo",
    CANCEL = "CancelEdit"
}

export const STORAGE_KEY: string = "Todo";