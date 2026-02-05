import { Pencil, Trash2 } from "lucide-react";
import { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const statusStyles =
    task.status === "COMPLETED"
      ? "bg-success/20 text-success"
      : "bg-warning/20 text-warning";

  return (
    <div className="group rounded-xl border border-white/10 bg-black/60 p-5 text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="mt-2 text-sm text-white/60">
            {task.description || "No description provided."}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles}`}>
          {task.status === "COMPLETED" ? "Completed" : "Pending"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-white/60">
        <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center gap-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:text-white"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <Pencil size={16} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:text-red-300"
            onClick={() => onDelete(task)}
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
