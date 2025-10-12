import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TaskResponse } from "../../interfaces/TaskResponse";
import { getAllTasks } from "../../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar as tarefas. Tente novamente.");
      console.error("Erro ao buscar tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Carregando tarefas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="text-red-500 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xl font-semibold mb-4">{error}</p>
            <button
              onClick={fetchTasks}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Minhas Tarefas
          </h1>
          <p className="text-gray-600">
            {tasks.length}{" "}
            {tasks.length === 1 ? "tarefa encontrada" : "tarefas encontradas"}
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-20 h-20 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma tarefa encontrada
            </h3>
            <p className="text-gray-500">Comece criando sua primeira tarefa!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate(`/detalhes/${task.id}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-indigo-500 cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                  {task.title}
                </h2>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/cadastrar")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium hover:bg-indigo-700"
          >
            Cadastrar Nova Tarefa
          </button>
          <button
            onClick={fetchTasks}
            className="ml-4 bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium border-2 border-indigo-200 hover:border-indigo-400"
          >
            Atualizar Lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
