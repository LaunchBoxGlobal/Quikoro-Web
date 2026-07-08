import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  icon: Icon = FaInbox,
  title = "No Data Found",
  description = "There's nothing to display at the moment.",
  action,
  className = "",
}) => {
  return (
    <div className="w-full mt-8">
      <div
        className={`flex min-h-[100vh] rounded-[20px] w-full flex-col items-center justify-center bg-white px-6 py-12 text-center ${className}`}
      >
        <div className="mb-5 rounded-full gradient-bg p-5">
          <Icon className="text-4xl text-gray-50" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>

        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;
