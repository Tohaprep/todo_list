import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/todolist";
import { useReducer, useState } from "react";
import Modal from "./components/Modal";
import { Button } from "@mui/material";
import DenseAppBar from "./components/DenseAppBar";
import { todolistReducer } from "./state/todolists.reducer";
import { useEffect } from "react";

export type filterValueType = "all" | "active" | "completed";

export type TaskType = { id: string; title: string; isDone: boolean };

export type todoListsType = {
  id: string;
  title: string;
  filterValue: filterValueType;
  tasks: TaskType[] | [];
};

function App() {
  const initState: Array<todoListsType> = [
    {
      id: v1(),
      title: "что выучить",
      filterValue: "all",
      tasks: [{ id: v1(), title: "TypeScript", isDone: false }],
    },
    {
      id: v1(),
      title: "что купить",
      filterValue: "all",
      tasks: [{ id: v1(), title: "футболка", isDone: false }],
    },
  ];

  const [state, dispatch] = useReducer(todolistReducer, initState, () => {
    const savedState = JSON.parse(localStorage.getItem("state") || "null");
    return savedState
      ? savedState
      : [
          {
            id: v1(),
            title: "что выучить",
            filterValue: "all",
            tasks: [{ id: v1(), title: "TypeScript", isDone: false }],
          },
          {
            id: v1(),
            title: "что купить",
            filterValue: "all",
            tasks: [{ id: v1(), title: "футболка", isDone: false }],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const [listIsAdding, setListIsAdding] = useState<boolean>(false);

  const filterTasks = (todoListId: string, value: filterValueType) => {
    dispatch({
      type: "FILTER_TASKS",
      todolistId: todoListId,
      filterValue: value,
    });
  };

  const addTask = (todoListId: string, value: string) => {
    dispatch({ type: "ADD_TASK", todolistId: todoListId, title: value });
  };

  const changeTaskTitle = (todoListId: string, id: string, value: string) => {
    dispatch({
      type: "CHANGE_TASK_TITLE",
      todolistId: todoListId,
      taskId: id,
      title: value,
    });
  };

  const removeTask = (todoListId: string, id: string) => {
    dispatch({ type: "REMOVE_TASK", todolistId: todoListId, taskId: id });
  };

  const changeTaskStatus = (
    todoListId: string,
    id: string,
    isDone: boolean
  ) => {
    dispatch({
      type: "CHANGE_TASK_STATUS",
      todolistId: todoListId,
      taskId: id,
      isDone: isDone,
    });
  };

  const addTodoList = (value: string) => {
    dispatch({ type: "CREATE_TODOLIST", title: value });
  };

  const changeTodoListTitle = (todoListId: string, value: string) => {
    dispatch({
      type: "CHANGE_TODOLIST_TITLE",
      todolistId: todoListId,
      title: value,
    });
  };

  const removeTodoList = (todoListId: string) => {
    dispatch({
      type: "REMOVE_TODOLIST",
      todolistId: todoListId,
    });
  };

  const closeModal = (value: boolean) => {
    setListIsAdding(value);
  };

  return (
    <div className="App">
      <DenseAppBar>
        <Button
          variant="contained"
          onClick={() => {
            setListIsAdding(true);
          }}>
          добавить
        </Button>
      </DenseAppBar>
      {listIsAdding && (
        <Modal addTodoList={addTodoList} closeModal={closeModal} />
      )}

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
