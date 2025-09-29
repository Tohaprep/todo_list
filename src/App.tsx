import "./App.css";
import { TodoList } from "./components/todolist";
import Modal from "./components/Modal";
import { Button } from "@mui/material";
import DenseAppBar from "./components/DenseAppBar";
import { useContext } from "react";
import { AppContext } from "./contexts/app_context/AppContext";
import type { AppContextType } from "./contexts/app_context/AppContextProvider";

function App() {
  const context = useContext<AppContextType | null>(AppContext);

  if (!context) {
    return <div>ожидаем...</div>;
  }

  const { state, listIsAdding, toggleListIsAdding } = context;
  return (
    <div className="App">
      <DenseAppBar>
        <Button
          variant="contained"
          onClick={() => {
            toggleListIsAdding(true);
          }}>
          добавить
        </Button>
      </DenseAppBar>
      {listIsAdding && <Modal />}

      <div className="todos">
        {state.map((todoList) => {
          let filteredTasks = todoList.tasks;

          if (todoList.filterValue === "active") {
            filteredTasks = filteredTasks.filter((t) => t.isDone == false);
          }

          if (todoList.filterValue === "completed") {
            filteredTasks = filteredTasks.filter((t) => t.isDone == true);
          }

          return (
            <TodoList
              key={todoList.id}
              todoListId={todoList.id}
              title={todoList.title}
              tasksArr={filteredTasks}
              filterValue={todoList.filterValue}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
