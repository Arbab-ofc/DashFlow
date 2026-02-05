import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#cfc3f4]">
      <Navbar
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        isMenuOpen={sidebarOpen}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="px-4 pb-16 pt-6 lg:ml-64 lg:px-10">{children}</main>
    </div>
  );
};

export default Layout;
