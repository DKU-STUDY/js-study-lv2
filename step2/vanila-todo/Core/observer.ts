import {STORAGE_KEY} from "./Constants";
import {store} from "../TodoStore";
import {todoState} from "./type";

let currentObserver: (() => void) | null = null;

export const observe = (fn: () => void) => {
    currentObserver = fn;
    fn();
    currentObserver = null;
}

// export function observable<T extends object>(obj:T)  {
//     Object.keys(obj).forEach((key) :asserts key is keyof obj=> {
//
//         let _value = obj[key];
//         const observers = new Set();
//         Object.defineProperty(obj, key, {
//             get() {
//                 if (currentObserver) observers.add(currentObserver);
//                 return _value;
//             },
//             set(value) {
//                 if (typeof value === "object") {
//                     observable(value);
//                 }
//                 _value = value;
//                 observers.forEach((fn: any) => fn());
//                 localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
//             }
//         })
//     })
//     return obj;
// }


export function observable<T extends object>(state: T) {
    const observeMap: { [key: string | symbol]: Set<() => void> } = {};
    return new Proxy<T>(state, {

        get(target, name) {
            observeMap[name] = observeMap[name] || new Set();
            if (currentObserver) observeMap[name].add(currentObserver);
            return target[name as keyof T];
        },
        set(target, name, value) {
            if (typeof value === "object") {
                observable(value)
            }
            if (target[name as keyof T] === value) return true;
            if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value)) return true;
            target[name as keyof T] = value;
            observeMap[name].forEach(fn => fn());
            return true;
        }
    })
}


// JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") ||
// localStorage.setItem(STORAGE_KEY, JSON.stringify(state));