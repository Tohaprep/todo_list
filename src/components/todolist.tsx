import { useState } from "react";
import type { filterValueType } from "../App";
import type { ChangeEvent } from "react";
import type { KeyboardEvent } from "react";

export type TasksProps = { id: string; title: string; isDone: boolean };

type TaskListProps = {
  title: string;
  tasksArr: Array<TasksProps>;
  filterValue: filterValueType;
  addTask: (value: string) => void;
  removeTask: (id: string) => void;
  filterTasks: (value: filterValueType) => void;
  changeTaskStatus: (task: TasksProps, id: string, isDone: boolean) => void;
};

export function TodoList({
  title,
  tasksArr,
  filterValue,
  addTask,
  removeTask,
  filterTasks,
  changeTaskStatus,
}: TaskListProps) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setNewTaskTitle(e.target.value);
  };

  const addTaskHandler = () => {
    newTaskTitle == "" ? setError("поле обязательно") : addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const inputEnterKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter" && e.ctrlKey == true) {
      addTaskHandler();
    }
  };

  const allFilterTaskHandler = () => filterTasks("all");
  const activeFilterTaskHandler = () => filterTasks("active");
  const completedFilterTaskHandler = () => filterTasks("completed");

  return (
    <div className="todo">
      <h2 className="todo_header">{title}</h2>
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
            const removeTaskHandler = () => removeTask(task.id);

            const changeTaskStatusHandler = () =>
              changeTaskStatus(task, task.id, !task.isDone);

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
