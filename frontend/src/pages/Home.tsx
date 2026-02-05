import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, MoveUpRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#cfc3f4]">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-gradient-to-br from-[#1b1b1f] via-[#3a2b5f] to-[#d7c8ff] p-6 shadow-[0_40px_120px_rgba(20,12,38,0.35)]">
          <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full border border-white/20" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full border border-white/15" />
          <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />

          <header className="flex flex-wrap items-center justify-between gap-4 px-2 pt-2 text-white">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Layers size={18} />
              </span>
              DashFlow
            </Link>
            <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
              <Link to="/login" className="transition-all hover:text-white">
                Services
              </Link>
              <Link to="/signup" className="transition-all hover:text-white">
                Team
              </Link>
              <Link to="/login" className="transition-all hover:text-white">
                Network
              </Link>
              <Link to="/signup" className="transition-all hover:text-white">
                Support
              </Link>
            </nav>
            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-white"
            >
              Get started
              <MoveUpRight size={14} />
            </Link>
          </header>

          <div className="grid gap-10 px-4 pb-8 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Executive task flow</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                DashFlow is a premium task command center.
              </h1>
              <p className="max-w-xl text-sm text-white/70">
                Maintain precision across planning, execution, and completion. DashFlow blends elegant visuals
                with disciplined task control for high-performing teams.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b1b1f] transition-all hover:shadow-[0_20px_60px_rgba(255,255,255,0.35)]"
                >
                  Launch workspace
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-white"
                >
                  View dashboard
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[28px] bg-black/70 p-6 text-white shadow-[0_30px_80px_rgba(10,8,18,0.45)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                <span>Strategic overview</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px]">Live</span>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  { label: "Active programs", value: "18", note: "In motion" },
                  { label: "Completed sprint items", value: "124", note: "Last 30 days" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold">{item.value}</p>
                      <p className="text-xs text-white/60">{item.label}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="relative -mt-14 grid gap-4 lg:grid-cols-[1.1fr_0.6fr_0.4fr]">
          <div className="rounded-[26px] bg-[#141218] p-8 text-white shadow-[0_30px_80px_rgba(24,16,42,0.35)]">
            <p className="text-sm font-semibold text-white/60">Assets under management</p>
            <p className="mt-6 text-5xl font-semibold">192k</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
              Tasks curated this quarter
            </p>
          </div>
          <div className="rounded-[26px] bg-[#141218] p-8 text-white shadow-[0_30px_80px_rgba(24,16,42,0.35)]">
            <p className="text-sm font-semibold text-white/60">Unique delegators</p>
            <p className="mt-6 text-5xl font-semibold">34</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
              Leadership alignment
            </p>
          </div>
          <div className="rounded-[26px] bg-[#141218] p-8 text-white shadow-[0_30px_80px_rgba(24,16,42,0.35)]">
            <p className="text-sm font-semibold text-white/60">Velocity</p>
            <p className="mt-6 text-4xl font-semibold">+18%</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">MoM gain</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
