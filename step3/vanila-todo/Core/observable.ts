import {STORAGE_KEY} from "./Constants";
import {store} from "../TodoStore";
import {todoState} from "./type";

let currentObserver: (Function | null) = null;

export const observe = (fn: Function) => {
    currentObserver = fn;
    console.log(fn);
    fn();
    currentObserver = null;
}
//
// export function observable<T extends object>(obj:T)  {
// Object.keys(obj).forEach((key) => {
//
//     let _value = obj[key as keyof T];
//     const observers = new Set();
//     Object.defineProperty(obj, key, {
//         get() {
//             if (currentObserver) observers.add(currentObserver);
//             return _value;
//         },
//         set(value) {
//             if(typeof value ==="object"){
//                 obj[key as keyof T] = observable(value);
//             }
//             if (_value === value) return;
//             if (JSON.stringify(_value) === JSON.stringify(value)) return;
//             _value = value;
//             observers.forEach((fn: any) => fn());
//             localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
//         }
//     })
// })
// return obj;
// }


export function observable<T extends object>(state: T) {
    const observeMap: { [key: string | symbol]: Set<Function> } = {};
    return new Proxy<T>(state, {

        get(target, name) {
            observeMap[name] = observeMap[name] || new Set();
            if (currentObserver) observeMap[name].add(currentObserver);
            console.log(currentObserver);
            return target[name as keyof T];
        },
        set(target, name, value) {

            if (target[name as keyof T] === value) return true;
            if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value)) return true;
            console.log(target, name, value);
            observeMap[name].forEach(fn => fn());
            return true;
        }
    })
}


//
//