export type TaskStatus = "PENDENTE" | "CONCLUIDO" | "EM_ANDAMENTO";

export interface TaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
