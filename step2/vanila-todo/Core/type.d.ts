export type todoState = {
    selected: number,
    todoList: todoItem[],
}
export type todoKey = keyof todoState;
export type todoValue = typeof todoState[todoKey]
export type todoItem = {
    id: number;
    text: string;
    completed: boolean;
}

export type StoreProp<T extends object> = {
    mutations: Record<Action, Commit<T>>
    actions: Record<Action, Dispatch<T>>
}
export type StoreContext<T extends object> = {
    state: T,
    commit: (action: Action, payload: any) => void,
    dispatch: (action: Action, ...params: any[]) => any,
}
type Commit<T> = (state: T, payload: any) => void;
type Dispatch<T> = (context: StoreContext<T>, payload: any) => any;