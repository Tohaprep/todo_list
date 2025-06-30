import "./App.css";
import { TodoList } from "./components/todolist";

const tasks1 = [
  { id: "0", title: "анжуманя", isDone: false },
  { id: "1", title: "бегит", isDone: true },
  { id: "2", title: "прес", isDone: true },
];

const tasks2 = [
  { id: "0", title: "монстры", isDone: true },
  { id: "1", title: "тентасьон", isDone: false },
  { id: "2", title: "кукиш", isDone: true },
];

function App() {
  return (
    <div className="App">
      <TodoList title="что сделать" tasksArr={tasks1} />
      <TodoList title="что посмотреть" tasksArr={tasks2} />
    </div>
  );
}

export default App;
