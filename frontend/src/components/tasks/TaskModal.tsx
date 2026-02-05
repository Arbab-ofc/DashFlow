import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";
import TaskForm from "./TaskForm";
import { Task, TaskStatus } from "../../types";

interface TaskModalProps {
  open: boolean;
  initialValues?: Task | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description?: string; status: TaskStatus }) => Promise<void>;
}

const TaskModal = ({ open, initialValues, loading, onClose, onSubmit }: TaskModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="flex items-center justify-between">
        {initialValues ? "Edit task" : "Create task"}
        <IconButton onClick={onClose} aria-label="Close">
          <X size={18} />
        </IconButton>
      </DialogTitle>
      <DialogContent className="pb-6">
        <TaskForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
