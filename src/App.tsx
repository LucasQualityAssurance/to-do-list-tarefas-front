import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormTask from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskList/TaskDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/detalhes/:id" element={<TaskDetails />} />
        <Route path="/cadastrar" element={<FormTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
