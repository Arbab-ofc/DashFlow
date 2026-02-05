import { Link } from "react-router-dom";
import { Layers } from "lucide-react";

const PublicHeader = () => {
  return (
    <header className="absolute left-0 right-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-textPrimary">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
            <Layers size={18} />
          </span>
          <span className="font-display">DashFlow</span>
        </Link>
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
      </div>
    </header>
  );
};

export default PublicHeader;
