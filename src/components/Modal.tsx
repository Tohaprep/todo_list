import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import TodoListInput from "./TodoListInput";

interface ModalTypes {
  addTodoList: (value: string) => void;
  closeModal: (value: boolean) => void;
}

export default function Modal({ addTodoList, closeModal }: ModalTypes) {
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
