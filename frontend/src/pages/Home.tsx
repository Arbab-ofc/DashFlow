import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Sparkles,
  Shield,
  Timer
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe,_#ffffff_45%,_#f8fafc_100%)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-textPrimary">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
            <Layers size={18} />
          </span>
          <span className="font-display">DashFlow</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-textSecondary md:flex">
          <a href="#features" className="transition-all hover:text-textPrimary">
            Features
          </a>
          <a href="#workflow" className="transition-all hover:text-textPrimary">
            Workflow
          </a>
          <a href="#security" className="transition-all hover:text-textPrimary">
            Security
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-textPrimary transition-all hover:border-primary"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-lift"
          >
            Get started
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Luxury workflow suite
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-textPrimary md:text-5xl">
            Precision task management for teams that operate with intent.
          </h1>
          <p className="text-base text-textSecondary">
            DashFlow blends intelligent task orchestration with a refined interface. Capture priorities, filter
            with clarity, and move through execution with confidence.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-soft transition-all hover:shadow-lift"
            >
              Start your workspace
              <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-textPrimary transition-all hover:border-primary"
            >
              View dashboard
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-textSecondary">
            <span className="rounded-full border border-border bg-white px-4 py-2">Priority filters</span>
            <span className="rounded-full border border-border bg-white px-4 py-2">Secure access</span>
            <span className="rounded-full border border-border bg-white px-4 py-2">Realtime updates</span>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-white/80 p-8 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">
              Flow snapshot
            </span>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              Live
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {[
              { title: "Product roadmap review", status: "Completed" },
              { title: "Client onboarding plan", status: "Pending" },
              { title: "Sprint scope alignment", status: "Pending" }
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-textPrimary">{item.title}</p>
                  <p className="text-xs text-textSecondary">Updated today</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Completed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Curated focus",
              description: "Surface the tasks that matter with refined filters and quick search."
            },
            {
              icon: Timer,
              title: "Momentum tracking",
              description: "Measure progress with status insights that keep teams aligned."
            },
            {
              icon: CheckCircle2,
              title: "Elegant execution",
              description: "Create, update, and resolve tasks without breaking flow."
            }
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-textPrimary">{feature.title}</h3>
                <p className="mt-2 text-sm text-textSecondary">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 rounded-3xl border border-border bg-white p-8 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-semibold text-textPrimary">Workflow crafted for clarity</h2>
            <p className="mt-3 text-sm text-textSecondary">
              DashFlow organizes every task across a single dashboard with status visibility and quick updates.
            </p>
            <div className="mt-6 grid gap-4">
              {["Capture with intent", "Assign priority", "Resolve with confidence"].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-border bg-slate-50 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-textPrimary">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
            <h3 className="text-lg font-semibold">Decision-ready status</h3>
            <p className="mt-2 text-sm text-slate-200">
              Real-time task states help teams move faster without losing precision.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2">
                <span>Pending tasks</span>
                <span className="text-warning">12</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2">
                <span>Completed today</span>
                <span className="text-success">5</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2">
                <span>High priority</span>
                <span className="text-primary">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-white px-8 py-10 shadow-soft md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Shield size={22} />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Security-first by design</h2>
              <p className="mt-2 text-sm text-textSecondary">
                Argon2 password hashing, JWT authentication, and Prisma validation protect every interaction.
              </p>
            </div>
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-secondary px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-lift"
          >
            Secure my account
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-textSecondary md:flex-row">
          <span>DashFlow Task Management</span>
          <span>Designed for premium productivity teams.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
