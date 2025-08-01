import type { filterValueType } from "../App";

type TasksProps = { id: number; title: string; isDone: boolean };

type TaskListProps = {
  title: string;
  tasksArr: Array<TasksProps>;
  removeTask: (id: number) => void;
  filterTasks: (value: filterValueType) => void;
};

export function TodoList({
  title,
  tasksArr,
  removeTask,
  filterTasks,
}: TaskListProps) {
  return (
    <div className="todo">
      <h2 className="todo_header">{title}</h2>
      <div className="todo_input">
        <input className="todo_textarea" type="text" />
        <button>Добавить</button>
      </div>
      <div className="todo_ul">
        <ul>
          {tasksArr.map((task) => (
            <li className="todo_li" key={task.id}>
              <input type="checkbox" checked={task.isDone}></input>
              <span>{task.title}</span>
              <button
                onClick={() => {
                  removeTask(task.id);
                }}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="todo_buttons">
        <button
          onClick={() => {
            filterTasks("all");
          }}>
          все
        </button>
        <button
          onClick={() => {
            filterTasks("active");
          }}>
          активные
        </button>
        <button
          onClick={() => {
            filterTasks("completed");
          }}>
          выполненные
        </button>
      </div>
    </div>
  );
}
