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
      <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/70 lg:flex font-monoDisplay">
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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all lg:hidden"
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={16} /> : <Menu size={16} />}
      </button>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={logoutUser}
          className="hidden items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-white lg:flex"
        >
          Logout
          <MoveUpRight size={14} />
        </button>
      ) : (
        <Link
          to="/signup"
          className="hidden items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-white lg:flex"
        >
          Signup
          <MoveUpRight size={14} />
        </Link>
      )}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-72 bg-[#141218] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-transform duration-200 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4 text-xs uppercase tracking-[0.2em] text-white/70 font-monoDisplay">
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
      </aside>
    </header>
  );
};

export default LuxuryHeader;
