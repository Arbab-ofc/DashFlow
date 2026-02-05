import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ label = "Loading" }: { label?: string }) => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-3 text-textSecondary">
        <CircularProgress size={22} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
