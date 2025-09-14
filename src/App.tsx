import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/todolist";
import { useState } from "react";
import Modal from "./components/Modal";
import { Button } from "@mui/material";
import DenseAppBar from "./components/DenseAppBar";
import { todolistReducer } from "./state/todolists.reducer";

export type filterValueType = "all" | "active" | "completed";

export type TaskType = { id: string; title: string; isDone: boolean };

export type todoListsType = {
  id: string;
  title: string;
  filterValue: filterValueType;
  tasks: TaskType[] | [];
};

function App() {
  const [todoLists, setTodoLists] = useState<Array<todoListsType>>([
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
  ]);

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
    setTodoLists(
      todolistReducer(todoLists, {
        type: "ADD_TASK",
        todolistId: todoListId,
        title: value,
      })
    );
  };

  const changeTaskTitle = (todoListId: string, id: string, value: string) => {
    setTodoLists(
      todolistReducer(todoLists, {
        type: "CHANGE_TASK_TITLE",
        todolistId: todoListId,
        taskId: id,
        title: value,
      })
    );
  };

  const removeTask = (todoListId: string, id: string) => {
    setTodoLists(
      todolistReducer(todoLists, {
        type: "REMOVE_TASK",
        todolistId: todoListId,
        taskId: id,
      })
    );
  };

  const changeTaskStatus = (
    todoListId: string,
    id: string,
    isDone: boolean
  ) => {
    setTodoLists(
      todolistReducer(todoLists, {
        type: "CHANGE_TASK_STATUS",
        todolistId: todoListId,
        taskId: id,
        isDone: isDone,
      })
    );
  };

  const addTodoList = (value: string) => {
    setTodoLists(
      todolistReducer(todoLists, { type: "CREATE_TODOLIST", value: value })
    );

    setListIsAdding(false);
  };

  const changeTodoListTitle = (TodoListId: string, value: string) => {
    setTodoLists(
      todolistReducer(todoLists, {
        type: "CHANGE_TODOLIST_TITLE",
        todolistId: TodoListId,
        value: value,
      })
    );
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(
      todolistReducer(todoLists, {
        type: "REMOVE_TODOLIST",
        todolistId: todoListId,
      })
    );
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
        {todoLists.map((todoList) => {
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
