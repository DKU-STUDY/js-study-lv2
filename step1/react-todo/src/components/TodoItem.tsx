import { toDo } from "../App";
import { useState } from "react";

type Props = {
  toDo: toDo;
  Delete: (id: number) => void;
  Update: (id: number, text: string) => void;
  Toggle: (id: number) => void;
};

export default function TodoItem({ toDo, Delete, Update, Toggle }: Props) {
  const [text, setText] = useState(toDo.text);
  const [edit, setEdit] = useState(false);
  return (
    <li>
      <input
        type="checkbox"
        checked={toDo.completed}
        onClick={(e) => Toggle(toDo.id)}
      />
      {edit ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              Update(toDo.id, text);
              setEdit(false);
            }}
          >
            완료
          </button>
          <button type="button" onClick={() => setEdit(false)}>
            취소
          </button>
        </>
      ) : (
        <>
          <span>{toDo.text}</span>
          <button onClick={(e) => setEdit(true)}>수정</button>
          <button onClick={(e) => Delete(toDo.id)}>삭제</button>
        </>
      )}
    </li>
  );
}
