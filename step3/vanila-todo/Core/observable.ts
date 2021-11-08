import {STORAGE_KEY} from "./Constants";
import {store} from "../TodoStore";
import {todoState} from "./type";

let currentObserver: (Function | null) = null;

export const observe = (fn: Function) => {

    currentObserver = fn;

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
//generator


export function deepObservable<T extends Object>(obj: T) {
    const newObj = observable(obj);
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== "object" || value === null) continue;
        newObj[key as keyof T] = deepObservable(value);
    }
    return newObj;
}

export function observable<T extends object>(state: T) {
    const observeMap: Map<T[keyof T], Set<Function>> = new Map();
    const handler: ProxyHandler<T> = {
        get(target, name, receiver) {
            if (name === 'isProxy') {
                return true;
            }
            const value = target[name as keyof T]
            console.log(target, name, receiver);
            if (typeof name === undefined) return;
            if (!value.isProxy === undefined && typeof value === 'object') {
                target[name as keyof T] = new Proxy(value, handler);
            }

            if (!observeMap.has(value)) {
                observeMap.set(value, new Set<Function>());
            }
            if (currentObserver) Set.prototype.add.call(observeMap.get(value), currentObserver);
            // if (currentObserver) observer.add(currentObserver);
            return value;
        }
        ,
        set(target, name, value) {
            console.log('target:' + target + "\nvalue:" + value);
            if (target[name as keyof T] === value) return true;
            if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value)) return true;

            target[name as keyof T] = value;
            if (observeMap.has(value)) {
                Set.prototype.forEach.call(observeMap.get(value), fn => fn());
            }
            // observer.forEach(fn => fn());
            return true;
        }
    }
    return new Proxy(state, handler);
}


//
//
// if (!observeMap.has(value)) observeMap.set(value, new Set());
//
// if (currentObserver) observeMap.get(value)!.add(currentObserver);
// observeMap.get(value).forEach(fn => fn());
//
// if (!observeMap.has(target[name as keyof T])) observeMap.set(target[name as keyof T], new Set());
// if (currentObserver) observeMap.get(target[name as keyof T])!.add(currentObserver);
// observeMap.get(target[name as keyof T])!.forEach(fn => fn());