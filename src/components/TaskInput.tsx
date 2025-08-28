import { useState, type ChangeEvent } from "react";

interface InputPropsType {
  addTask: (todoListId: string, value: string) => void;
  addTodoList?: (value: string) => void;
  todoListId: string;
  children?: React.ReactNode;
}

export default function TaskInput({
  children,
  addTask,
  todoListId,
}: InputPropsType) {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInputValue(e.target.value);
  };

  const addTaskHandler = () => {
    inputValue === ""
      ? setError("поле обязательно")
      : addTask(todoListId, inputValue);
    setInputValue("");
  };

  const inputEnterKeyDownTaskHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code == "Enter" && e.ctrlKey == true) {
      addTaskHandler();
    }
  };
  const hideErrorHandler = () => {
    setError("");
  };

  return (
    <div>
      <div className="todo_input">
        <div className="modal_input">
          <input
            className={error === "" ? "todo_textarea" : "todo_textarea-error"}
            type="text"
            value={inputValue}
            onChange={setInputValueHandler}
            onKeyDown={inputEnterKeyDownTaskHandler}
          />
          {error && <p className="error_message">{error}</p>}
        </div>
        <button onClick={addTaskHandler} onBlur={hideErrorHandler}>
          +
        </button>
        {children}
      </div>
    </div>
  );
}
