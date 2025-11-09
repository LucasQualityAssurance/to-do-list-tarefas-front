import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TaskDto, TaskStatus } from "../../interfaces/TaskDto";
import {
  registerTask,
  updateTask,
  getTaskById,
} from "../../services/taskService";

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<TaskDto>({
    title: "",
    description: "",
    status: "PENDENTE",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetchTaskData();
    }
  }, [id]);

  const fetchTaskData = async () => {
    if (!id) {
      setMessage("❌ ID da tarefa não encontrado.");
      setFetching(false);
      return;
    }

    try {
      setFetching(true);
      const task = await getTaskById(id);
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    } catch (error: any) {
      setMessage("❌ Erro ao carregar a tarefa.");
      console.error("Erro ao buscar tarefa:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value as TaskStatus });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isEditing && id) {
        await updateTask(id, formData);
        setMessage("✅ Tarefa atualizada com sucesso!");
        setTimeout(() => {
          navigate(`/tarefa/${id}`);
        }, 1500);
      } else {
        const response = await registerTask(formData);
        setMessage("✅ Tarefa registrada com sucesso!");
        console.log("Resposta do backend:", response);
        setFormData({ title: "", description: "", status: "PENDENTE" });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error: any) {
      const errorMsg = isEditing
        ? "❌ Ocorreu um erro ao atualizar a tarefa."
        : "❌ Ocorreu um erro ao registrar a tarefa.";
      setMessage(error.response?.data || errorMsg);
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Carregando tarefa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(isEditing ? `/tarefa/${id}` : "/")}
          className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {isEditing ? "Voltar para Detalhes" : "Voltar para Lista"}
        </button>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white">
              {isEditing ? "Editar Tarefa" : "Criar Nova Tarefa"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Digite o título da tarefa"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Digite a descrição da tarefa"
                rows={5}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="">Selecione o status...</option>
                <option value="PENDENTE">Pendente</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="CONCLUIDO">Concluído</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isEditing ? "Atualizando..." : "Salvando..."}
                </span>
              ) : isEditing ? (
                "Atualizar Tarefa"
              ) : (
                "Salvar Tarefa"
              )}
            </button>
          </form>

          {message && (
            <div className="px-8 pb-8">
              <div
                className={`p-4 rounded-lg text-center font-semibold ${
                  message.startsWith("✅")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
