import "./App.css";
import { TodoList } from "./components/todolist";

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
