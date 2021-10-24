import {toDo} from "../App";
import TodoItem from "./TodoItem";

type Props={
    toDos: toDo[],
    Delete: (id:number)=>void,
    Update:(id:number, text:string)=>void,
    Toggle:(id:number)=>void,
}
export default function TodoList(props:Props){
   const {toDos, ...rest} = props;
    return (
        <>
            {toDos.map(todo=>(
                <TodoItem toDo={todo} {...rest}/>
            ))}
        </>
    )
}