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
    mutations: Record<string, Commit<T>>
    actions: Record<string, Dispatch<T>>
}
export type StoreContext<T extends object> = {
    state: T,
    commit: (action: string, payload: any) => void,
    dispatch: (action: string, ...params: any[]) => any,
}
type Commit<T> = (state: T, payload: any) => void;
type Dispatch<T> = (context: StoreContext<T>, payload: any) => any;