import {STORAGE_KEY} from "./Constants";
import {store} from "../TodoStore";
import {todoState} from "./type";

let currentObserver: (Function | null) = null;

export const observe = (fn: Function) => {

    currentObserver = fn;
    fn();
    console.log(fn);
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


export function observable<T extends Object>(state: T) {
    const observeMap: Record<string | symbol, Set<Function>> = Object.keys(state).reduce((map, key) => {
        map[key] = new Set();
        return map;
    }, {});
    const validator: ProxyHandler<T> = {
        get(target, name) {
            let value = target[name as keyof T];
           
            observeMap[name] = observeMap[name] || new Set();
            if (currentObserver) observeMap[name].add(currentObserver);
            return value;
        },
        set(target, name, value, receiver) {
            if (target[name as keyof T] === value) return true;
            if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value)) return true;
            console.log(target);
            typeof value === "object" ? target[name as keyof T] = observable(value) : target[name as keyof T] = value;
            observeMap[name].forEach(fn => fn());
            return true;
        }
    };
    return new Proxy<T>(state, validator);

}


//
//

