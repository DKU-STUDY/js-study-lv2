import { useState } from "react";

const TodoItem = (props) => {
  const { id, content, isFin, onDelete, onToggle, onUpdate } = props;

  const [editMode, isEditMode] = useState(false);
  const [input, setInput] = useState(content);
  const handleFinEdit = () => {
    isEditMode(false);
    const content = input;
    if (onUpdate) onUpdate({ id, content });
    setInput("");
  };
  return (
    <li>
      <span
        onClick={() => {
          if (onToggle) onToggle(id);
        }}
        style={{ cursor: "pointer" }}
      >
        {isFin ? "✅" : "🚀"}
      </span>
      <span>{" - "}</span>

      <span
        onClick={() => {
          isEditMode(!editMode);
        }}
        style={{ cursor: "pointer" }}
      >
        ✏️
      </span>
      <span> </span>
      <span
        onClick={() => {
          if (onDelete) onDelete(id);
        }}
        style={{ cursor: "pointer" }}
      >
        ❌
      </span>
      <span>{" - "}</span>
      {editMode ? (
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFinEdit();
            }
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      ) : (
        <span>{content}</span>
      )}
    </li>
  );
};

const Todo = () => {
  const [input, setInput] = useState("");
  const [todoState, setTodoState] = useState([
    {
      id: 0,
      content: "todo1",
      isFin: false,
    },
  ]);

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  const addTodo = (content) => {
    setTodoState((prev) => [
      ...prev,
      { id: prev.length, content, isFin: false },
    ]);
  };

  const handleOnUpdate = ({ id, content }) => {
    let nextTodo = todoState;
    if (nextTodo[id] && nextTodo[id].content && content)
      nextTodo[id].content = content;
    setTodoState((prev) => [...nextTodo]);
  };

  const handleOnDelete = (id) => {
    let nextTodo = todoState;
    nextTodo.splice(id, 1);
    setTodoState((prev) => [...nextTodo]);
  };

  const handleOnToggle = (id) => {
    let nextTodo = todoState;
    nextTodo[id].isFin = !nextTodo[id].isFin;
    setTodoState((prev) => [...nextTodo]);
  };

  return (
    <div className="App">
      <form onSubmit={handleTodoSubmit}>
        <label>New Todo</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter todo"
        ></input>
      </form>
      <ul>
        {todoState.map((todo, idx) => (
          <TodoItem
            onDelete={(e) => handleOnDelete(e)}
            onToggle={(e) => handleOnToggle(e)}
            onUpdate={(e) => handleOnUpdate(e)}
            key={idx}
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
