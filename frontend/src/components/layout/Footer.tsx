import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 bg-[#c6b8f0]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-[#221b3b] md:flex-row md:items-center">
        <span className="font-monoDisplay">DashFlow Task Management</span>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link to="/dashboard" className="transition-all hover:text-black">
            Dashboard
          </Link>
          <Link to="/profile" className="transition-all hover:text-black">
            Profile
          </Link>
          <a href="#top" className="transition-all hover:text-black">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
