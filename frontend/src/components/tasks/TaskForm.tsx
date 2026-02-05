import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Task, TaskStatus } from "../../types";

interface TaskFormValues {
  title: string;
  description?: string;
  status: TaskStatus;
}

interface TaskFormProps {
  initialValues?: Task | null;
  onSubmit: (data: TaskFormValues) => Promise<void>;
  loading?: boolean;
}

const TaskForm = ({ initialValues, onSubmit, loading }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      status: "PENDING"
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title,
        description: initialValues.description ?? "",
        status: initialValues.status
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "PENDING"
      });
    }
  }, [initialValues, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Title"
        fullWidth
        {...register("title", { required: "Title is required" })}
        error={Boolean(errors.title)}
        helperText={errors.title?.message}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        minRows={3}
        {...register("description")}
      />
      <TextField
        label="Status"
        select
        fullWidth
        defaultValue="PENDING"
        {...register("status")}
      >
        <MenuItem value="PENDING">Pending</MenuItem>
        <MenuItem value="COMPLETED">Completed</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" disabled={loading} className="!rounded-lg">
        {loading ? "Saving..." : "Save task"}
      </Button>
    </form>
  );
};

export default TaskForm;
