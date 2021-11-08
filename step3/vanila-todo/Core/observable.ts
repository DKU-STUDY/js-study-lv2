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
const targetMap = new WeakMap();

function track(target, name) {
    if (!currentObserver) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(name);
    if (!dep) {
        depsMap.set(name, (dep = new Set()));
    }
    if (!dep.has(currentObserver)) {
        dep.add(currentObserver);
    }
}


function trigger(target, name) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    const dep = depsMap.get(name);
    if (dep) {
        dep.forEach(fn => fn());
    }

}

export function observable<T extends object>(state: T) {
    const observeMap: Record<string | symbol, Set<Function>> = {};
    const handler: ProxyHandler<T> = {
        get(target, name, receiver) {
            const res = Reflect.get(target, name, receiver);
            track(target, name);
            return res;
        }
        ,
        set(target, name, value, receiver) {
            const oldValue = target[name as keyof T];
            const res = value;
            if (oldValue !== res) {
                trigger(target, name);
            }
            return res;
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