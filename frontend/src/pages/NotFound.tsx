import { Link } from "react-router-dom";
import LuxuryHeader from "../components/layout/LuxuryHeader";

const NotFound = () => {
  return (
    <div id="top" className="min-h-screen bg-[#cfc3f4]">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-gradient-to-br from-[#1b1b1f] via-[#3a2b5f] to-[#d7c8ff] p-6 shadow-[0_40px_120px_rgba(20,12,38,0.35)]">
          <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full border border-white/20" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full border border-white/15" />
          <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />

          <LuxuryHeader />

          <div className="flex flex-col items-start gap-6 px-4 pb-10 pt-16 text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Navigation error</p>
            <h1 className="text-4xl font-semibold md:text-5xl font-monoDisplay">
              This route is out of sequence.
            </h1>
            <p className="max-w-xl text-sm text-white/70">
              The page you requested cannot be located. Return to DashFlow and continue your workflow.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
