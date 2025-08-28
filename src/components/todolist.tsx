import type { filterValueType } from "../App";
import type { TaskType } from "../App";
import TaskInput from "./TaskInput";
import EditableSpan from "./EditableSpan";

type TaskListProps = {
  todoListId: string;
  title: string;
  tasksArr: Array<TaskType>;
  filterValue: filterValueType;
  addTask: (todoListId: string, value: string) => void;
  changeTaskTitle: (todoListId: string, id: string, value: string) => void;
  removeTask: (todoListId: string, id: string) => void;
  filterTasks: (todoListId: string, value: filterValueType) => void;
  changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
  changeTodoListTitle: (todoListId: string, value: string) => void;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList({
  todoListId,
  title,
  tasksArr,
  filterValue,
  addTask,
  changeTaskTitle,
  removeTask,
  filterTasks,
  changeTaskStatus,
  changeTodoListTitle,
  removeTodoList,
}: TaskListProps) {
  const allFilterTaskHandler = () => filterTasks(todoListId, "all");
  const activeFilterTaskHandler = () => filterTasks(todoListId, "active");
  const completedFilterTaskHandler = () => filterTasks(todoListId, "completed");
  const editTodoListTitleHandler = (value: string) => {
    changeTodoListTitle(todoListId, value);
  };

  return (
    <div className="todo">
      <h2 className="todo_header">
        {/* {title} */}
        <EditableSpan title={title} onSubmit={editTodoListTitleHandler} />
        <button
          onClick={() => {
            removeTodoList(todoListId);
          }}>
          х
        </button>
      </h2>

      <TaskInput addTask={addTask} todoListId={todoListId} />

      <div className="todo_ul">
        <ul>
          {tasksArr.map((task) => {
            const removeTaskHandler = () => removeTask(todoListId, task.id);

            const changeTaskStatusHandler = () =>
              changeTaskStatus(todoListId, task.id, !task.isDone);

            const editTaskTitleHandler = (value: string) => {
              changeTaskTitle(todoListId, task.id, value);
            };

            return (
              <li
                className={task.isDone === true ? "todo_li is_done" : "todo_li"}
                key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}></input>
                <EditableSpan
                  title={task.title}
                  onSubmit={editTaskTitleHandler}
                />
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
