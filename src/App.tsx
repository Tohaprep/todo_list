import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/todolist";
import { useState } from "react";

export type filterValueType = "all" | "active" | "completed";

export type TaskType = { id: string; title: string; isDone: boolean };

type todoListsType = {
  id: string;
  title: string;
  filterValue: filterValueType;
};

type TasksType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
    {
      id: v1(),
      title: "что выучить",
      filterValue: "all",
    },
    {
      id: v1(),
      title: "что купить",
      filterValue: "all",
    },
  ]);

  const [tasks, setTasks] = useState<TasksType>({
    [todoLists[0].id]: [{ id: v1(), title: "TypeScript", isDone: false }],
    [todoLists[1].id]: [{ id: v1(), title: "футболка", isDone: false }],
  });

  const filterTasks = (todoListId: string, value: filterValueType) => {
    const newTodoLists = todoLists.map((todoList) => {
      return todoList.id === todoListId
        ? { ...todoList, filterValue: value }
        : todoList;
    });
    setTodoLists(newTodoLists);
  };

  const addTask = (todoListId: string, value: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [todoListId]: [
        { id: v1(), title: value, isDone: false },
        ...(prevTasks[todoListId] || []),
      ],
    }));
  };

  const removeTask = (todoListId: string, id: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [todoListId]: tasks[todoListId].filter((task) => task.id !== id),
    }));
  };

  const changeTaskStatus = (
    todoListId: string,
    id: string,
    isDone: boolean
  ) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [todoListId]: [
        ...tasks[todoListId].map((task) => {
          return task.id === id ? { ...task, isDone: isDone } : task;
        }),
      ],
    }));
  };

  return (
    <div className="App">
      <div className="todos">
        {todoLists.map((todoList) => {
          let filteredTasks = tasks[todoList.id];

          if (todoList.filterValue === "active") {
            filteredTasks = tasks[todoList.id].filter((t) => t.isDone == false);
          }

          if (todoList.filterValue === "completed") {
            filteredTasks = tasks[todoList.id].filter((t) => t.isDone == true);
          }

          return (
            <TodoList
              key={todoList.id}
              todoListId={todoList.id}
              title={todoList.title}
              tasksArr={filteredTasks}
              filterValue={todoList.filterValue}
              addTask={addTask}
              removeTask={removeTask}
              filterTasks={filterTasks}
              changeTaskStatus={changeTaskStatus}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
