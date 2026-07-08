import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorPage = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white rounded-[20px] mt-8 px-4">
      <div className="w-full max-w-md bg-transparent text-center">
        <div className="flex justify-center mb-4">
          <div className="gradient-bg rounded-full w-20 h-20 flex items-center justify-center">
            <AlertTriangle className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>

        <p className="text-slate-500 mb-8">{message}</p>

        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-xl font-medium hover:bg-[#012d3a] transition-all duration-200"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
