import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Layout from "../components/layout/Layout";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import TaskModal from "../components/tasks/TaskModal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { Task, TaskStatus } from "../types";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error,
    search,
    status,
    setSearchTerm,
    setStatusFilter,
    createTaskItem,
    updateTaskItem,
    deleteTaskItem
  } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);

  const joinedDate = useMemo(() => {
    if (!user?.createdAt) return "";
    return new Date(user.createdAt).toLocaleDateString();
  }, [user]);

  const handleCreate = () => {
    setActiveTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setActiveTask(task);
    setModalOpen(true);
  };

  const handleDeleteRequest = (task: Task) => {
    setPendingDelete(task);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    await deleteTaskItem(pendingDelete.id);
    setConfirmOpen(false);
    setPendingDelete(null);
  };

  const handleSave = async (data: { title: string; description?: string; status: TaskStatus }) => {
    setSaving(true);
    try {
      if (activeTask) {
        await updateTaskItem(activeTask.id, data);
      } else {
        await createTaskItem(data);
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="grid gap-6">
        <section className="rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-8 text-white shadow-soft">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">Dashboard</p>
            <h1 className="text-3xl font-semibold">Welcome back, {user?.name || "there"}</h1>
            <p className="text-sm text-white/80">Keep your tasks flowing with clear focus.</p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-textPrimary">Task management</h2>
            <p className="mt-1 text-sm text-textSecondary">
              Search, filter, and manage your tasks with clarity.
            </p>
            <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-xs">
                <Search className="absolute left-3 top-3 text-textSecondary" size={18} />
                <input
                  className="w-full rounded-xl border border-border bg-white py-2 pl-10 pr-3 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Search tasks"
                  value={search}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <TaskFilters status={status} onChange={setStatusFilter} />
              <button
                onClick={handleCreate}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-lift"
              >
                <Plus size={16} />
                Add task
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-textPrimary">Profile</h2>
            <p className="mt-1 text-sm text-textSecondary">Your workspace details.</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Name</span>
                <span className="font-medium text-textPrimary">{user?.name || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Email</span>
                <span className="font-medium text-textPrimary">{user?.email || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-textSecondary">Joined</span>
                <span className="font-medium text-textPrimary">{joinedDate || "-"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-textPrimary">Your tasks</h2>
            <span className="text-sm text-textSecondary">{tasks.length} items</span>
          </div>
          <div className="mt-5">
            {loading && <LoadingSpinner label="Loading tasks" />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDeleteRequest} />
            )}
          </div>
        </section>
      </div>

      <TaskModal
        open={modalOpen}
        initialValues={activeTask}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete task"
        description="This action cannot be undone. Are you sure you want to delete this task?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        confirmLabel="Delete"
      />
    </Layout>
  );
};

export default Dashboard;
