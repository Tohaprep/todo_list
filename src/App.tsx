import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/todolist";
import { useState } from "react";
import type { TasksProps } from "./components/todolist";

export type filterValueType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: "анжуманяsdaaaaaaa", isDone: false },
    { id: v1(), title: "бегит", isDone: true },
    { id: v1(), title: "прес", isDone: true },
  ]);

  console.log(tasks);

  const [filterValue, setFilterValue] = useState<filterValueType>("all");
  let filteredTasks = tasks;

  const filterTasks = (value: filterValueType) => setFilterValue(value);

  const addTask = (value: string) => {
    const newTask = { id: v1(), title: value, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeTaskStatus = (task: TasksProps, id: string, isDone: boolean) => {
    const updatedTask = { ...task, isDone: isDone };
    console.log(updatedTask);
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  if (filterValue === "active") {
    filteredTasks = tasks.filter((t) => t.isDone == false);
  }

  if (filterValue === "completed") {
    filteredTasks = tasks.filter((t) => t.isDone == true);
  }

  return (
    <div className="App">
      <div className="todos">
        <TodoList
          title="что сделать"
          tasksArr={filteredTasks}
          addTask={addTask}
          removeTask={removeTask}
          filterTasks={filterTasks}
          changeTaskStatus={changeTaskStatus}
        />
      </div>
    </div>
  );
}

export default App;
