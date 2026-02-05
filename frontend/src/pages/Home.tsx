import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import LuxuryHeader from "../components/layout/LuxuryHeader";

const Home = () => {
  return (
    <div id="top" className="min-h-screen bg-[#cfc3f4]">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-gradient-to-br from-[#1b1b1f] via-[#3a2b5f] to-[#d7c8ff] p-6 shadow-[0_40px_120px_rgba(20,12,38,0.35)]">
          <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full border border-white/20" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full border border-white/15" />
          <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />

          <LuxuryHeader />

          <div className="grid gap-10 px-4 pb-8 pt-12">
            <div className="space-y-6 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Executive task flow</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl font-monoDisplay">
                DashFlow is a premium task command center.
              </h1>
              <p className="max-w-xl text-sm text-white/70">
                Maintain precision across planning, execution, and completion. DashFlow blends elegant visuals
                with disciplined task control for high-performing teams.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b1b1f] transition-all hover:shadow-[0_20px_60px_rgba(255,255,255,0.35)] font-monoDisplay"
                >
                  Launch workspace
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-white font-monoDisplay"
                >
                  View dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="relative -mt-14 rounded-[30px] bg-[#141218] p-8 text-white shadow-[0_30px_80px_rgba(24,16,42,0.35)]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Executive insights</p>
              <h2 className="text-3xl font-semibold font-monoDisplay">
                Orchestrate every task with measured momentum.
              </h2>
              <p className="text-sm text-white/60">
                DashFlow keeps leadership aligned with live status pulses and high-level execution markers.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Portfolio coverage", value: "92%" },
                { label: "Active task lanes", value: "18" },
                { label: "Executive approvals", value: "41" },
                { label: "Velocity score", value: "+18%" }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">{item.label}</p>
                  <p className="mt-4 text-2xl font-semibold font-monoDisplay">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <footer className="border-t border-white/30 bg-[#c6b8f0]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-[#221b3b] md:flex-row md:items-center">
          <span className="font-monoDisplay">DashFlow Task Management</span>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
            <Link to="/login" className="transition-all hover:text-black">
              Sign in
            </Link>
            <Link to="/signup" className="transition-all hover:text-black">
              Start now
            </Link>
            <a href="#top" className="transition-all hover:text-black">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
