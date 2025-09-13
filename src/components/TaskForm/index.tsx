import React, { useState } from "react";
import type { TaskDto, TaskStatus } from "../../interfaces/TaskDto";
import { registerTask } from "../../services/taskService";

const TaskForm: React.FC = () => {
  const [formData, setFormData] = useState<TaskDto>({
    title: "",
    description: "",
    status: "PENDENTE",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
      const response = await registerTask(formData);
      setMessage("✅ Tarefa registrada com sucesso!");
      console.log("Resposta do backend:", response);

      setFormData({ title: "", description: "", status: "PENDENTE" });

      setTimeout(() => setMessage(null), 5000);
    } catch (error: any) {
      setMessage(
        error.response?.data || "❌ Ocorreu um erro ao registrar a tarefa."
      );

      setTimeout(() => setMessage(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Criar Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block text-gray-700">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Digite o título"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block text-gray-700">
              Descrição <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Digite a descrição"
              rows={4}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="status" className="block text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              <option value="PENDENTE">Pendente</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center font-semibold ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
