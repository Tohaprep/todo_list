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
        <button onClick={closeModalHandler}>отменить</button>
      </TodoListInput>
    </div>
  );
}
