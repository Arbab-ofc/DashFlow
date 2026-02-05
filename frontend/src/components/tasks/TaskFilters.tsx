import { CheckCircle2, ListTodo, Filter } from "lucide-react";
import { TaskStatus } from "../../types";

interface TaskFiltersProps {
  status?: TaskStatus;
  onChange: (status?: TaskStatus) => void;
}

const TaskFilters = ({ status, onChange }: TaskFiltersProps) => {
  const baseClass =
    "flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/70 transition-all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className={`${baseClass} ${!status ? "bg-white text-[#1b1b1f]" : "hover:text-white"}`}
        onClick={() => onChange(undefined)}
      >
        <Filter size={16} />
        All
      </button>
      <button
        className={`${baseClass} ${status === "PENDING" ? "bg-warning text-white" : "hover:text-white"}`}
        onClick={() => onChange("PENDING")}
      >
        <ListTodo size={16} />
        Pending
      </button>
      <button
        className={`${baseClass} ${status === "COMPLETED" ? "bg-success text-white" : "hover:text-white"}`}
        onClick={() => onChange("COMPLETED")}
      >
        <CheckCircle2 size={16} />
        Completed
      </button>
    </div>
  );
};

export default TaskFilters;
