import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SignupForm from "../components/auth/SignupForm";
import PublicHeader from "../components/layout/PublicHeader";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <PublicHeader />
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-white/90 p-8 shadow-soft">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-textPrimary">Create your workspace</h2>
              <p className="text-sm text-textSecondary">Start capturing tasks with clarity.</p>
            </div>
            <SignupForm onSubmit={handleSubmit} loading={loading} />
            <div className="mt-6 flex items-center justify-between text-sm text-textSecondary">
              <span>Already have an account?</span>
              <Link className="inline-flex items-center gap-2 font-medium text-primary" to="/login">
                Sign in
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              DashFlow System
            </span>
            <h1 className="text-4xl font-semibold text-textPrimary md:text-5xl">
              Build your day with intention and momentum.
            </h1>
            <p className="text-base text-textSecondary">
              Keep your tasks organized with smart filters, instant updates, and a dashboard that feels calm.
            </p>
            <div className="grid gap-4 text-sm text-textSecondary sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                Track progress clearly
              </div>
              <div className="rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                Update status instantly
              </div>
              <div className="rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                Stay aligned with goals
              </div>
              <div className="rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                Access anywhere
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
