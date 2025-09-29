import { useContext, useState, type ChangeEvent } from "react";
import Button from "@mui/material/Button";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { TextField } from "@mui/material";
import { AppContext } from "../contexts/app_context/AppContext";

interface InputPropsType {
  todoListId: string;
  children?: React.ReactNode;
}

export default function TaskInput({ children, todoListId }: InputPropsType) {
  const context = useContext(AppContext);
  if (!context) {
    return <div>загружаем...</div>;
  }
  const { addTask } = context;

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
          <TextField
            id="outlined-basic"
            label="Название задачи"
            variant="outlined"
            className={error === "" ? "todo_textarea" : "todo_textarea-error"}
            type="text"
            value={inputValue}
            onChange={setInputValueHandler}
            onKeyDown={inputEnterKeyDownTaskHandler}
          />
          {error && <p className="error_message">{error}</p>}
        </div>
        <Button onClick={addTaskHandler} onBlur={hideErrorHandler}>
          <CheckRoundedIcon></CheckRoundedIcon>
        </Button>
        {children}
      </div>
    </div>
  );
}
