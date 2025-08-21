import { useState } from "react";
import type { filterValueType } from "../App";
import type { ChangeEvent } from "react";
import type { KeyboardEvent } from "react";
import type { TaskType } from "../App";

type TaskListProps = {
  todoListId: string;
  title: string;
  tasksArr: Array<TaskType>;
  filterValue: filterValueType;
  addTask: (todoListId: string, value: string) => void;
  removeTask: (todoListId: string, id: string) => void;
  filterTasks: (todoListId: string, value: filterValueType) => void;
  changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList({
  todoListId,
  title,
  tasksArr,
  filterValue,
  addTask,
  removeTask,
  filterTasks,
  changeTaskStatus,
  removeTodoList,
}: TaskListProps) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setNewTaskTitle(e.target.value);
  };

  const addTaskHandler = () => {
    newTaskTitle == ""
      ? setError("поле обязательно")
      : addTask(todoListId, newTaskTitle);
    setNewTaskTitle("");
  };

  const inputEnterKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter" && e.ctrlKey == true) {
      addTaskHandler();
    }
  };

  const allFilterTaskHandler = () => filterTasks(todoListId, "all");
  const activeFilterTaskHandler = () => filterTasks(todoListId, "active");
  const completedFilterTaskHandler = () => filterTasks(todoListId, "completed");

  return (
    <div className="todo">
      <span>
        <h2 className="todo_header">{title}</h2>
        <button
          onClick={() => {
            removeTodoList(todoListId);
          }}>
          х
        </button>
      </span>
      <div className="todo_input">
        <input
          className={error ? "todo_textarea-error" : "todo_textarea"}
          type="text"
          value={newTaskTitle}
          onChange={addTitleTaskHandler}
          onKeyDown={inputEnterKeyDownTaskHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      {error && <p className="error_message">{error}</p>}
      <div className="todo_ul">
        <ul>
          {tasksArr.map((task) => {
            const removeTaskHandler = () => removeTask(todoListId, task.id);

            const changeTaskStatusHandler = () =>
              changeTaskStatus(todoListId, task.id, !task.isDone);

            return (
              <li
                className={task.isDone === true ? "todo_li is_done" : "todo_li"}
                key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}></input>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="todo_buttons">
        <button
          className={filterValue == "all" ? "todo_button-active" : ""}
          onClick={allFilterTaskHandler}>
          все
        </button>
        <button
          className={filterValue == "active" ? "todo_button-active" : ""}
          onClick={activeFilterTaskHandler}>
          активные
        </button>
        <button
          className={filterValue == "completed" ? "todo_button-active" : ""}
          onClick={completedFilterTaskHandler}>
          выполненные
        </button>
      </div>
    </div>
  );
}
