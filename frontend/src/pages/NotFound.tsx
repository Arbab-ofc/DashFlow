import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">DashFlow</p>
        <h1 className="mt-4 text-4xl font-semibold text-textPrimary">Page not found</h1>
        <p className="mt-3 text-base text-textSecondary">
          The page you are looking for does not exist. Return to your dashboard to continue managing tasks.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
