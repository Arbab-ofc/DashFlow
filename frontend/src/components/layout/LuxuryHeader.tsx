import { Link } from "react-router-dom";
import { Layers, MoveUpRight, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const LuxuryHeader = () => {
  const { isAuthenticated, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-2 pt-2 text-white">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase font-monoDisplay"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
          <Layers size={18} />
        </span>
        DashFlow
      </Link>
      <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/70 md:flex font-monoDisplay">
        <Link to="/" className="transition-all hover:text-white">
          Home
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="transition-all hover:text-white">
              Dashboard
            </Link>
            <Link to="/profile" className="transition-all hover:text-white">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="transition-all hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="transition-all hover:text-white">
              Signup
            </Link>
          </>
        )}
      </nav>
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all md:hidden"
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={16} /> : <Menu size={16} />}
      </button>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={logoutUser}
          className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-white"
        >
          Logout
          <MoveUpRight size={14} />
        </button>
      ) : (
        <Link
          to="/signup"
          className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-white"
        >
          Signup
          <MoveUpRight size={14} />
        </Link>
      )}
      {menuOpen && (
        <div className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-xs uppercase tracking-[0.2em] text-white/70 md:hidden">
          <div className="flex flex-col gap-3 font-monoDisplay">
            <Link to="/" className="transition-all hover:text-white" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="transition-all hover:text-white" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/profile" className="transition-all hover:text-white" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logoutUser();
                    setMenuOpen(false);
                  }}
                  className="text-left transition-all hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="transition-all hover:text-white" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="transition-all hover:text-white" onClick={() => setMenuOpen(false)}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default LuxuryHeader;
