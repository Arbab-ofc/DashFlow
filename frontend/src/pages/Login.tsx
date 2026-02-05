import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center gap-6">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              DashFlow Workspace
            </span>
            <h1 className="text-4xl font-semibold text-textPrimary md:text-5xl">
              Organize tasks. Stay focused. Move with clarity.
            </h1>
            <p className="text-base text-textSecondary">
              DashFlow keeps your daily flow structured with smart filters, quick actions, and a calm interface.
            </p>
            <div className="flex items-center gap-4 text-sm text-textSecondary">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Fast capture</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Clear status</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Secure access</span>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/90 p-8 shadow-soft">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-textPrimary">Welcome back</h2>
              <p className="text-sm text-textSecondary">Sign in to your DashFlow account.</p>
            </div>
            <LoginForm onSubmit={handleSubmit} loading={loading} />
            <div className="mt-6 flex items-center justify-between text-sm text-textSecondary">
              <span>New to DashFlow?</span>
              <Link className="inline-flex items-center gap-2 font-medium text-primary" to="/signup">
                Create account
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
