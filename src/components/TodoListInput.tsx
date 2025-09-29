import { Button, Paper } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface InputPropsType {
  addTodoList: (value: string) => void;

  children: React.ReactNode;
}

export default function TodoListInput({
  children,
  addTodoList,
}: InputPropsType) {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInputValue(e.target.value);
  };

  const addTodoListHandler = () => {
    inputValue === "" ? setError("поле обязательно") : addTodoList(inputValue);
    setInputValue("");
  };

  const inputEnterKeyDownTaskHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code == "Enter" && e.ctrlKey == true) {
      addTodoListHandler();
    }
  };

  const hideErrorHandler = () => {
    setError("");
  };

  return (
    <div>
      <Paper className="modal_form">
        <div className="modal_input">
          <TextField
            id="outlined-basic"
            label="название списка"
            variant="outlined"
            className={error === "" ? "todo_textarea" : "todo_textarea-error"}
            type="text"
            value={inputValue}
            onChange={setInputValueHandler}
            onKeyDown={inputEnterKeyDownTaskHandler}
          />
          {error && <p className="error_message">{error}</p>}
        </div>
        <div className="modal_buttons">
          <Button
            variant="contained"
            onClick={addTodoListHandler}
            onBlur={hideErrorHandler}>
            добавить список
          </Button>
          {children}
        </div>
      </Paper>
    </div>
  );
}
