import "./App.css";
import { TodoList } from "./components/todolist";

const tasks1 = [
  { id: "0", title: "анжуманя", isDone: false },
  { id: "1", title: "бегит", isDone: true },
  { id: "2", title: "прес", isDone: true },
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
