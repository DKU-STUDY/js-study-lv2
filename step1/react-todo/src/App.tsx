import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { ApolloProvider, gql, useQuery, useReactiveVar } from "@apollo/client";

import TodoItem from "./components/TodoItem";

export type toDo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const parsedTodos: toDo[] = JSON.parse(
    localStorage.getItem("toDos") as string
  );

  const [toDos, setTodos] = useState<toDo[]>(parsedTodos || []); //로딩시 localStorage 호출
  const nextId = useRef(0);
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  const checkExists = (id: number): number | undefined => {
    //에러 검출을 위한 함수
    const target = toDos.findIndex((todo) => todo.id === id);
    if (!target) {
      alert("todo does not exists");
      return;
    }
    return target;
  };

  function addTodo(text: string) {
    const newTodo: toDo = { id: nextId.current, text, completed: false };

    setTodos((prev) => [...prev, newTodo]);
    nextId.current += 1;
  }

  function updateTodo(id: number, text: string) {
    const target = checkExists(id);
    if (target) {
      const newTodos = [...toDos];
      newTodos[target].text = text;
      setTodos(newTodos);
    }
  }

  function deleteTodo(id: number) {
    const target = checkExists(id);
    if (target) {
      const newTodos = [...toDos];
      newTodos.splice(target, 1);
      setTodos(newTodos);
    }
  }

  function toggleTodo(id: number) {
    const target = checkExists(id);
    if (target) {
      const newTodos = [...toDos];
      newTodos[target].completed = !newTodos[target].completed;
      setTodos(newTodos);
    }
  }

  return (
    <>
      <Header />
      <TodoInput addTodo={addTodo} />
      <ul>
        {toDos?.map((todo) => (
          <TodoItem
            toDo={todo}
            Delete={deleteTodo}
            Update={updateTodo}
            Toggle={toggleTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
