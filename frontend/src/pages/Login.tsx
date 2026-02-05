import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import LuxuryHeader from "../components/layout/LuxuryHeader";

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
    <div id="top" className="min-h-screen bg-[#cfc3f4]">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-gradient-to-br from-[#1b1b1f] via-[#3a2b5f] to-[#d7c8ff] p-6 shadow-[0_40px_120px_rgba(20,12,38,0.35)]">
          <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full border border-white/20" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full border border-white/15" />
          <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />

          <LuxuryHeader />

          <div className="grid gap-10 px-4 pb-8 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Member access</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl font-monoDisplay">
                Return to your DashFlow command center.
              </h1>
              <p className="max-w-xl text-sm text-white/70">
                Continue where you left off with a refined dashboard and real-time task visibility.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-white/70">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Secure entry</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Quick status</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Priority focus</span>
              </div>
            </div>
            <div className="rounded-[28px] bg-white/95 p-8 text-[#1b1b1f] shadow-[0_30px_80px_rgba(10,8,18,0.35)]">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Welcome back</h2>
                <p className="text-sm text-slate-500">Sign in to continue managing tasks.</p>
              </div>
              <LoginForm onSubmit={handleSubmit} loading={loading} />
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <span>New to DashFlow?</span>
                <Link className="inline-flex items-center gap-2 font-medium text-primary" to="/signup">
                  Create account
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
