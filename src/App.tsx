import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormTask from "./components/TaskForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
