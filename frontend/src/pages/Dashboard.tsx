import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Layout from "../components/layout/Layout";
import LuxuryHeader from "../components/layout/LuxuryHeader";
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
      <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-gradient-to-br from-[#1b1b1f] via-[#3a2b5f] to-[#d7c8ff] p-6 shadow-[0_40px_120px_rgba(20,12,38,0.35)]">
        <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full border border-white/20" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full border border-white/15" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />

        <LuxuryHeader />
        <div className="grid gap-6 px-4 pb-8 pt-10">
          <section className="rounded-[28px] bg-black/70 px-6 py-8 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Dashboard</p>
              <h1 className="text-3xl font-semibold font-monoDisplay">
                Welcome back, {user?.name || "there"}
              </h1>
              <p className="text-sm text-white/70">Keep your tasks flowing with clear focus.</p>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] bg-[#141218] p-6 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
              <h2 className="text-lg font-semibold">Task management</h2>
              <p className="mt-1 text-sm text-white/60">
                Search, filter, and manage your tasks with clarity.
              </p>
              <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative w-full xl:max-w-xs">
                  <Search className="absolute left-3 top-3 text-white/60" size={18} />
                  <input
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Search tasks"
                    value={search}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <TaskFilters status={status} onChange={setStatusFilter} />
                <button
                  onClick={handleCreate}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#1b1b1f] shadow-sm transition-all hover:shadow-[0_20px_60px_rgba(255,255,255,0.35)]"
                >
                  <Plus size={16} />
                  Add task
                </button>
              </div>
            </div>
            <div className="rounded-[28px] bg-[#141218] p-6 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="mt-1 text-sm text-white/60">Your workspace details.</p>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Name</span>
                  <span className="font-medium">{user?.name || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Email</span>
                  <span className="font-medium">{user?.email || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Joined</span>
                  <span className="font-medium">{joinedDate || "-"}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-[#141218] p-6 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your tasks</h2>
              <span className="text-sm text-white/60">{tasks.length} items</span>
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
