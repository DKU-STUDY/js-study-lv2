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
    state: T,
    mutations: { [key: string]: (state: T, payload: any) => void }
    actions: { [key: string]: (context: StoreContext<T>, payload: any) => void }
}
export type StoreContext<T extends object> = {
    state: T,
    commit: (action: string, payload: any) => void,
    dispatch: (action: string, payload: any) => void,
}