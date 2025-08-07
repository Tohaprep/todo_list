import { useState } from "react";
import type { filterValueType } from "../App";
import type { ChangeEvent } from "react";

type TasksProps = { id: string; title: string; isDone: boolean };

type TaskListProps = {
  title: string;
  tasksArr: Array<TasksProps>;
  addTask: (value: string) => void;
  removeTask: (id: string) => void;
  filterTasks: (value: filterValueType) => void;
};

export function TodoList({
  title,
  tasksArr,
  addTask,
  removeTask,
  filterTasks,
}: TaskListProps) {
  let [newTaskTitle, setNewTaskTitle] = useState("");

  const addTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.target.value);

  const addTaskHandler = () => {
    newTaskTitle == "" ? null : addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const allFilterTaskHandler = () => filterTasks("all");
  const activeFilterTaskHandler = () => filterTasks("active");
  const completedFilterTaskHandler = () => filterTasks("completed");

  return (
    <div className="todo">
      <h2 className="todo_header">{title}</h2>
      <div className="todo_input">
        <input
          className="todo_textarea"
          type="text"
          value={newTaskTitle}
          onChange={addTitleTaskHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <div className="todo_ul">
        <ul>
          {tasksArr.map((task) => {
            const removeTaskHandler = () => removeTask(task.id);

            return (
              <li className="todo_li" key={task.id}>
                <input type="checkbox" checked={task.isDone}></input>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="todo_buttons">
        <button onClick={allFilterTaskHandler}>все</button>
        <button onClick={activeFilterTaskHandler}>активные</button>
        <button onClick={completedFilterTaskHandler}>выполненные</button>
      </div>
    </div>
  );
}
