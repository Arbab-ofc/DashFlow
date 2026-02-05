import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, UserCircle, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Navbar = ({ onMenuToggle, isMenuOpen }: NavbarProps) => {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-textSecondary transition-all hover:text-textPrimary lg:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-textPrimary">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
            <LayoutDashboard size={18} />
          </span>
          <span className="font-display">DashFlow</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="hidden items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-textSecondary transition-all hover:text-textPrimary lg:flex"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-textPrimary shadow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {initials}
            </span>
            <span className="hidden sm:inline">{user?.name || "User"}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-border bg-white p-2 shadow-soft">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-textSecondary">
                <UserCircle size={16} />
                {user?.email || "user@example.com"}
              </div>
              <button
                onClick={logoutUser}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error transition-all hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
