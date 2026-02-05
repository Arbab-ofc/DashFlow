import { useMemo } from "react";
import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, Home } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const initials = useMemo(() => {
    if (!user?.name) return "DF";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#141218]/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white shadow-sm">
            <LayoutDashboard size={18} />
          </span>
          <span className="font-display">DashFlow</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="hidden items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 transition-all hover:text-white lg:flex"
        >
          <Home size={16} />
          Home
        </Link>
        <Link
          to="/dashboard"
          className="hidden items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 transition-all hover:text-white lg:flex"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <div className="relative">
          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white shadow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
              {initials}
            </span>
            <span className="hidden sm:inline">{user?.name || "User"}</span>
          </Link>
        </div>
        <button
          onClick={logoutUser}
          className="hidden items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 transition-all hover:text-white md:flex"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
