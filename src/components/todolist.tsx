import type {
  filterValueType,
  TaskType,
} from "../contexts/app_context/AppContextProvider";
import TaskInput from "./TaskInput";
import EditableSpan from "./EditableSpan";
import { Button } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useContext } from "react";
import { AppContext } from "../contexts/app_context/AppContext";

type TaskListProps = {
  todoListId: string;
  title: string;
  tasksArr: Array<TaskType>;
  filterValue: filterValueType;
};

export function TodoList({
  todoListId,
  title,
  tasksArr,
  filterValue,
}: TaskListProps) {
  const context = useContext(AppContext);
  if (!context) {
    return <div>загружаем...</div>;
  }

  const {
    filterTasks,
    changeTodoListTitle,
    removeTodoList,
    removeTasks,
    changeTaskStatus,
    changeTaskTitle,
  } = context;

  const allFilterTaskHandler = () => filterTasks(todoListId, "all");
  const activeFilterTaskHandler = () => filterTasks(todoListId, "active");
  const completedFilterTaskHandler = () => filterTasks(todoListId, "completed");
  const editTodoListTitleHandler = (value: string) => {
    changeTodoListTitle(todoListId, value);
  };
  const removeTodoListHandler = () => {
    removeTodoList(todoListId);
  };

  return (
    <Paper className="todolist" elevation={5}>
      <h2 className="todolist_header">
        <EditableSpan title={title} onSubmit={editTodoListTitleHandler} />

        <Button
          className="todolist_delete"
          color="error"
          onClick={removeTodoListHandler}>
          <DeleteRounded></DeleteRounded>
        </Button>
      </h2>

      <TaskInput todoListId={todoListId} />

      <div>
        <ul className="todo_ul">
          {JSON.stringify(tasksArr) === "[]" ? (
            <p className="todo_notification">тут пусто!</p>
          ) : (
            tasksArr.map((task) => {
              const removeTaskHandler = () => removeTasks(todoListId, task.id);

              const changeTaskStatusHandler = () =>
                changeTaskStatus(todoListId, task.id, !task.isDone);

              const editTaskTitleHandler = (value: string) => {
                changeTaskTitle(todoListId, task.id, value);
              };

              return (
                <li
                  className={
                    task.isDone === true ? "todo_li is_done" : "todo_li"
                  }
                  key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}></input>
                  <EditableSpan
                    title={task.title}
                    onSubmit={editTaskTitleHandler}
                  />
                  <label
                    className="todo_deleteLabel"
                    onClick={removeTaskHandler}>
                    <DeleteForever></DeleteForever>
                  </label>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="todo_buttons">
        <Button
          variant={filterValue == "all" ? "contained" : "outlined"}
          className={filterValue == "all" ? "todo_button-active" : ""}
          onClick={allFilterTaskHandler}>
          все
        </Button>
        <Button
          variant={filterValue == "active" ? "contained" : "outlined"}
          className={filterValue == "active" ? "todo_button-active" : ""}
          onClick={activeFilterTaskHandler}>
          активные
        </Button>
        <Button
          variant={filterValue == "completed" ? "contained" : "outlined"}
          className={filterValue == "completed" ? "todo_button-active" : ""}
          onClick={completedFilterTaskHandler}>
          выполненные
        </Button>
      </div>
    </Paper>
  );
}
