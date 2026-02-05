import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SignupForm from "../components/auth/SignupForm";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import LuxuryHeader from "../components/layout/LuxuryHeader";

const Signup = () => {
  const { signupUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await signupUser(data.name, data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Signup failed. Try again.");
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

          <div className="grid gap-10 px-4 pb-8 pt-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] bg-white/95 p-8 text-[#1b1b1f] shadow-[0_30px_80px_rgba(10,8,18,0.35)]">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Create your workspace</h2>
                <p className="text-sm text-slate-500">Start curating tasks with precision.</p>
              </div>
              <SignupForm onSubmit={handleSubmit} loading={loading} />
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <span>Already have an account?</span>
                <Link className="inline-flex items-center gap-2 font-medium text-primary" to="/login">
                  Sign in
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="space-y-6 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Private workspace</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl font-monoDisplay">
                Build a command layer for every mission-critical task.
              </h1>
              <p className="max-w-xl text-sm text-white/70">
                DashFlow blends visibility with decisive control so you can orchestrate execution with ease.
              </p>
              <div className="grid gap-4 text-xs text-white/70 sm:grid-cols-2">
                {[
                  "Instant visibility",
                  "Premium focus",
                  "Strategic alignment",
                  "Secure delivery"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
