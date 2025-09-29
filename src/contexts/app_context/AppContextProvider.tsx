import { todolistReducer } from "../../state/todolists.reducer";
import type React from "react";
import { useState, useMemo, useReducer, useEffect } from "react";
import { AppContext } from "./AppContext";
import { v1 } from "uuid";

export type ProviderProps = {
  children: React.ReactNode;
};
export type filterValueType = "all" | "active" | "completed";

export type TaskType = { id: string; title: string; isDone: boolean };

export type todoListsType = {
  id: string;
  title: string;
  filterValue: filterValueType;
  tasks: TaskType[] | [];
};

export type AppContextType = {
  state: todoListsType[];
  listIsAdding: boolean;

  toggleListIsAdding: (value: boolean) => void;

  filterTasks: (todoListId: string, value: filterValueType) => void;

  addTask: (todoListId: string, value: string) => void;

  changeTaskTitle: (todoListId: string, id: string, value: string) => void;

  removeTasks: (todoListId: string, id: string) => void;

  changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;

  addTodoList: (value: string) => void;

  changeTodoListTitle: (todoListId: string, value: string) => void;

  removeTodoList: (todoListId: string) => void;

  closeModal: (value: boolean) => void;
};
export function AppContextProvider(props: ProviderProps) {
  const initState: Array<todoListsType> = useMemo(() => {
    return [
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
  }, []);

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

  const value: AppContextType = {
    state,
    listIsAdding,

    toggleListIsAdding: (value) => {
      setListIsAdding(value);
    },

    filterTasks: (todoListId, value) => {
      dispatch({
        type: "FILTER_TASKS",
        todolistId: todoListId,
        filterValue: value,
      });
    },

    addTask: (todoListId, value) => {
      dispatch({ type: "ADD_TASK", todolistId: todoListId, title: value });
    },

    changeTaskTitle: (todoListId, id, value) => {
      dispatch({
        type: "CHANGE_TASK_TITLE",
        todolistId: todoListId,
        taskId: id,
        title: value,
      });
    },

    removeTasks: (todoListId, id) => {
      dispatch({ type: "REMOVE_TASK", todolistId: todoListId, taskId: id });
    },

    changeTaskStatus: (todoListId, id, isDone) => {
      dispatch({
        type: "CHANGE_TASK_STATUS",
        todolistId: todoListId,
        taskId: id,
        isDone: isDone,
      });
    },

    addTodoList: (value) => {
      dispatch({ type: "CREATE_TODOLIST", title: value });
    },

    changeTodoListTitle: (todoListId, value) => {
      dispatch({
        type: "CHANGE_TODOLIST_TITLE",
        todolistId: todoListId,
        title: value,
      });
    },

    removeTodoList: (todoListId) => {
      dispatch({
        type: "REMOVE_TODOLIST",
        todolistId: todoListId,
      });
    },

    closeModal: (value) => {
      setListIsAdding(value);
    },
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
