import axios from "axios";
import type { TaskDto } from "../interfaces/TaskDto";

const API_URL = "http://localhost:8081/tarefa";

export const registerTask = async (task: TaskDto) => {
  const response = await axios.post(`${API_URL}/registrar`, task, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
