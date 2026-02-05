import { NavLink } from "react-router-dom";
import { CheckCircle2, ListTodo, UserCircle, LayoutDashboard } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard", label: "Tasks", icon: ListTodo },
    { to: "/dashboard", label: "Completed", icon: CheckCircle2 },
    { to: "/profile", label: "Profile", icon: UserCircle }
  ];

  return (
    <>
      {open && (
        <button
          className="fixed inset-0 z-20 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r border-white/10 bg-[#141218] px-4 py-6 transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0 shadow-soft" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Workspace
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="rounded-xl bg-white/5 p-4 text-xs text-white/60">
          Organize your day with focus and flow.
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
