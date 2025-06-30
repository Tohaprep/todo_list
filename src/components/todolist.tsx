import { useState } from "react";

type TasksTitle = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsTitle = {
  title: string;
  tasksArr: Array<TasksTitle>;
};

export function TodoList({ title, tasksArr }: PropsTitle) {
  const [tasks, setTasks] = useState(tasksArr);

  return (
    <div className="todo">
      <h2>{title}</h2>
      <div className="add_input">
        <input type="text" />
        <button>Добавить</button>
      </div>
      <div>
        <ul>
          {tasks.map((task) => (
            <li className="list_inner" id={task.id}>
              <input type="checkbox" checked={task.isDone}></input>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
