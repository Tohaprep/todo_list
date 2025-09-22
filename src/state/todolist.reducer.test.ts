import { describe, it, expect, beforeEach } from "vitest";
import type { todoListsType } from "../App";
import { v1 } from "uuid";
import { todolistReducer } from "./todolists.reducer";

describe("в приложении", () => {
  let initState: todoListsType[] = [];
  beforeEach(() => {
    initState = [
      {
        id: "1",
        title: "что выучить",
        filterValue: "all",
        tasks: [{ id: v1(), title: "TypeScript", isDone: false }],
      },
      {
        id: "2",
        title: "что купить",
        filterValue: "all",
        tasks: [{ id: v1(), title: "футболка", isDone: false }],
      },
    ];
  });
  it("можно создавать новый список", () => {
    const endState = todolistReducer(initState, {
      type: "CREATE_TODOLIST",
      title: "тест",
    });
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("тест");
  });
  it("можно изменять название списка", () => {
    const endState = todolistReducer(initState, {
      type: "CHANGE_TODOLIST_TITLE",
      todolistId: "1",
      title: "изменено",
    });
    expect(endState[0].title).toBe("изменено");
  });
  it("можно удалять список", () => {
    const endState = todolistReducer(initState, {
      type: "REMOVE_TODOLIST",
      todolistId: "2",
    });
    expect(endState.length).toBe(1);
    expect(endState[1]).toBe(undefined);
  });
  it("можно фильтровать список", () => {
    const endState = todolistReducer(initState, {
      type: "FILTER_TASKS",
      todolistId: "1",
      filterValue: "completed",
    });
    expect(endState[0].filterValue).toBe("completed");
  });
});

describe("в каждом списке задач", () => {
  let initState: todoListsType[] = [];
  beforeEach(() => {
    initState = [
      {
        id: "1",
        title: "что выучить",
        filterValue: "all",
        tasks: [{ id: "1", title: "TypeScript", isDone: false }],
      },
      {
        id: "2",
        title: "что купить",
        filterValue: "all",
        tasks: [{ id: "1", title: "футболка", isDone: false }],
      },
    ];
  });

  it("можно создавать новую задачу", () => {
    const endState = todolistReducer(initState, {
      type: "ADD_TASK",
      todolistId: "1",
      title: "тест",
    });
    expect(endState[0].tasks.length).toBe(2);
    expect(endState[0].tasks[1].title).toBe("тест");
  });
  it("можно менять название задачи", () => {
    const endState = todolistReducer(initState, {
      type: "CHANGE_TASK_TITLE",
      todolistId: "1",
      taskId: "1",
      title: "тест",
    });
    expect(endState[0].tasks[0].title).toBe("тест");
  });
  it("можно менять статус задачи", () => {
    const endState = todolistReducer(initState, {
      type: "CHANGE_TASK_STATUS",
      todolistId: "1",
      taskId: "1",
      isDone: true,
    });
    expect(endState[0].tasks[0].isDone).toBe(true);
  });
  it("можно удалять задачу", () => {
    const endState = todolistReducer(initState, {
      type: "REMOVE_TASK",
      todolistId: "1",
      taskId: "2",
    });
    expect(endState[0].tasks.length).toBe(1);
    expect(endState[0].tasks[1]).toBe(undefined);
  });
});
