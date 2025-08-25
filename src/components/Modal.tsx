import { useState, type ChangeEvent } from "react";

interface ModalTypes {
  addTodoList: (value: string) => void;
  closeModal: (value: boolean) => void;
}

export default function Modal({ addTodoList, closeModal }: ModalTypes) {
  const [modalInputValue, setModalInputValue] = useState<string>("");

  const addTodoListHandler = () => {
    addTodoList(modalInputValue);
  };

  const closeModalHandler = () => {
    closeModal(false);
  };

  const modalInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setModalInputValue(e.target.value.trim());
  };
  //REFACTOR: поколдовать с инпутом отдельно для модалки
  return (
    <div className="modal_overlay">
      <form action="submit" className="modal_form">
        <input
          type="text"
          placeholder="название списка"
          value={modalInputValue}
          onChange={modalInputValueHandler}
        />
        <div className="modal_buttons">
          <button onClick={addTodoListHandler}>добавить список</button>
          <button onClick={closeModalHandler}>отмена</button>
        </div>
      </form>
    </div>
  );
}
