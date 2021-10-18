import { useState } from "react";

type props = {
  addTodo: (text: string) => void;
};
export default function TodoInput({ addTodo }: props) {
  const [newTodo, setNewTodo] = useState("");
  const onChangeTodo = (e: any) => {
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={onChangeTodo}
          value={newTodo}
          placeholder="please enter todo"
        />
        <input type="submit" value="추가" />
      </form>
    </>
  );
}
