import "./App.css";
import { TodoList } from "./components/todolist";
import { useState } from "react";

export type filterValueType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, title: "анжуманяsdaaaaaaa", isDone: false },
    { id: 1, title: "бегит", isDone: true },
    { id: 2, title: "прес", isDone: true },
  ]);

  const [filterValue, setFilterValue] = useState<filterValueType>("all");
  let filteredTasks = tasks;

  const filterTasks = (value: filterValueType) => setFilterValue(value);
  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  if (filterValue === "active") {
    filteredTasks = tasks.filter((t) => t.isDone == false);
  }

  return (
    <div className="App">
      <div className="todos">
        <TodoList
          title="что сделать"
          tasksArr={filteredTasks}
          removeTask={removeTask}
          filterTasks={filterTasks}
        />
      </div>
    </div>
  );
}

export default App;
