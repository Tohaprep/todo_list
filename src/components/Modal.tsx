import { Button } from "@mui/material";
import TodoListInput from "./TodoListInput";
import { useContext } from "react";
import { AppContext } from "../contexts/app_context/AppContext";

export default function Modal() {
  const context = useContext(AppContext);
  if (!context) {
    return <div>загружаем...</div>;
  }
  const { closeModal, addTodoList } = context;

  const closeModalHandler = () => {
    closeModal(false);
  };
  return (
    <div className="modal_overlay">
      <TodoListInput addTodoList={addTodoList}>
        <Button variant="outlined" onClick={closeModalHandler}>
          отменить
        </Button>
      </TodoListInput>
    </div>
  );
}
