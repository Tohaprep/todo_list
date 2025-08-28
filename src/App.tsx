import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/todolist";
import { useState } from "react";
import Modal from "./components/Modal";

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
  const [todoLists, setTodoLists] = useState<Array<todoListsType>>([
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
    ...(todoLists[0] && {
      [todoLists[0].id]: [{ id: v1(), title: "TypeScript", isDone: false }],
    }),
    ...(todoLists[1] && {
      [todoLists[1].id]: [{ id: v1(), title: "футболка", isDone: false }],
    }),
  });

  const [listIsAdding, setListIsAdding] = useState<boolean>(false);

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

  const changeTaskTitle = (todoListId: string, id: string, value: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [todoListId]: [
        ...prevTasks[todoListId].map((task) => {
          return task.id === id ? { ...task, title: value } : task;
        }),
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

  const addTodoList = (value: string) => {
    const newTodoList: todoListsType = {
      id: v1(),
      title: value,
      filterValue: "all",
    };
    setTodoLists([...todoLists, newTodoList]);
    setTasks({
      ...tasks,
      [newTodoList.id]: [{ id: v1(), title: "новое задание", isDone: false }],
    });
    setListIsAdding(false);
  };

  const changeTodoListTitle = (TodoListId: string, value: string) => {
    setTodoLists((prevTodoLists) => {
      return [
        ...prevTodoLists.map((todoList) => {
          return todoList.id === TodoListId
            ? { ...todoList, title: value }
            : todoList;
        }),
      ];
    });
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(
      todoLists.filter((todolist) => {
        return todolist.id !== todoListId;
      })
    );
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      delete updatedTasks[todoListId];
      return updatedTasks;
    });
  };

  const closeModal = (value: boolean) => {
    setListIsAdding(value);
  };

  return (
    <div className="App">
      {listIsAdding && (
        <Modal addTodoList={addTodoList} closeModal={closeModal} />
      )}
      <button
        onClick={() => {
          setListIsAdding(true);
        }}>
        добавить список
      </button>
      <div className="todos">
        {todoLists.map((todoList) => {
          let filteredTasks = tasks[todoList.id];

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
              addTask={addTask}
              changeTaskTitle={changeTaskTitle}
              removeTask={removeTask}
              filterTasks={filterTasks}
              changeTaskStatus={changeTaskStatus}
              changeTodoListTitle={changeTodoListTitle}
              removeTodoList={removeTodoList}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
