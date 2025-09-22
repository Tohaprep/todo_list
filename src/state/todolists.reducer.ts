import type { filterValueType, todoListsType } from "../App";

import { v1 } from "uuid";

type ActionType =
  | {
      type: "CREATE_TODOLIST";
      title: string;
    }
  | { type: "CHANGE_TODOLIST_TITLE"; todolistId: string; title: string }
  | {
      type: "REMOVE_TODOLIST";
      todolistId: string;
    }
  | {
      type: "ADD_TASK";
      todolistId: string;
      title: string;
    }
  | {
      type: "CHANGE_TASK_TITLE";
      todolistId: string;
      taskId: string;
      title: string;
    }
  | {
      type: "REMOVE_TASK";
      todolistId: string;
      taskId: string;
    }
  | {
      type: "CHANGE_TASK_STATUS";
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }
  | {
      type: "FILTER_TASKS";
      todolistId: string;
      filterValue: filterValueType;
    };

export const todolistReducer = (
  state: Array<todoListsType>,
  action: ActionType
) => {
  switch (action.type) {
    case "CREATE_TODOLIST": {
      const newTodolist: todoListsType = {
        id: v1(),
        title: action.title,
        filterValue: "all",
        tasks: [],
      };
      return [...state, newTodolist];
    }
    case "CHANGE_TODOLIST_TITLE": {
      return state.map((list) =>
        list.id === action.todolistId ? { ...list, title: action.title } : list
      );
    }
    case "REMOVE_TODOLIST": {
      return state.filter((list) => list.id !== action.todolistId);
    }
    case "ADD_TASK": {
      return state.map((list) => {
        return list.id === action.todolistId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: v1(), title: action.title, isDone: false },
              ],
            }
          : list;
      });
    }
    case "CHANGE_TASK_TITLE": {
      return state.map((list) => {
        return list.id === action.todolistId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                return task.id === action.taskId
                  ? { ...task, title: action.title }
                  : task;
              }),
            }
          : list;
      });
    }
    case "REMOVE_TASK": {
      return state.map((list) => {
        return list.id === action.todolistId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => {
                return task.id !== action.taskId;
              }),
            }
          : list;
      });
    }
    case "CHANGE_TASK_STATUS": {
      return state.map((list) => {
        return list.id === action.todolistId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                return task.id === action.taskId
                  ? { ...task, isDone: action.isDone }
                  : task;
              }),
            }
          : list;
      });
    }
    case "FILTER_TASKS": {
      return state.map((list) =>
        list.id === action.todolistId
          ? { ...list, filterValue: action.filterValue }
          : list
      );
    }

    default:
      return state;
  }
};
