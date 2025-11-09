import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskList/TaskDetails";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/cadastrar" element={<TaskForm />} />
        <Route path="/tarefa/editar/:id" element={<TaskForm />} />
        <Route path="/tarefa/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
