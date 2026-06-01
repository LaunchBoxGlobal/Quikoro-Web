import { useState } from "react";
import { Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../services/authApi/authSlice";
import FormErrorMessage from "../../../components/ui/FormErrorMessage";

const WorkerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C8.68629 2 6 4.68629 6 8H18C18 4.68629 15.3137 2 12 2Z" />
    <path d="M5 9C4.44772 9 4 9.44772 4 10C4 10.5523 4.44772 11 5 11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H5Z" />
    <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12H8Z" />
    <path d="M12 17.5C7.58172 17.5 4 21.0817 4 22H20C20 21.0817 16.4183 17.5 12 17.5Z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4.5A2.5 2.5 0 0 0 2 8.5v3.5h20V8.5A2.5 2.5 0 0 0 19.5 6H16zM10 4h4v2h-4V4z" />
    <path d="M2 14v3.5A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5V14H2z" />
    <path d="M9 13h6v2H9v-2z" />
  </svg>
);

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleNavigate = () => {
    if (!selectedRole) {
      setError("Please choose how you'd like to use Fixly.");
      return;
    }

    dispatch(setSignupData({ role: selectedRole.toUpperCase() }));

    navigate("/signup");
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center p-6 text-gray-900">
      <div className="w-full max-w-[400px] flex flex-col pt-8 pb-12 space-y-4">
        <div className="text-center">
          <h1 className="text-[32px] font-bold tracking-tight mb-1">
            Quickoro
          </h1>
          <p className="text-[16px] text-gray-500">
            Your trusted service marketplace
          </p>
        </div>

        {error && <FormErrorMessage apiError={error} />}

        <div className="flex flex-col gap-4 mb-8 w-full">
          <button
            onClick={() => setSelectedRole("customer")}
            className={`relative flex items-center p-4 rounded-[20px] transition-all text-left w-full
              ${
                selectedRole === "customer"
                  ? "bg-white border-2 border-[#18181b] shadow-sm"
                  : "bg-white border-2 border-transparent shadow-sm shadow-gray-200/50 hover:border-gray-200"
              }`}
          >
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[14px] bg-[#18181b] mr-5">
              <div className="text-white">
                <WorkerIcon />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold text-[#18181b] leading-tight mb-1">
                I need a service
              </span>
              <span className="text-[14.5px] text-gray-500 leading-tight">
                Find and book trusted providers
              </span>
            </div>
            {selectedRole === "customer" && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b]">
                <Check className="text-white" size={14} strokeWidth={3} />
              </div>
            )}
          </button>

          <button
            onClick={() => setSelectedRole("provider")}
            className={`relative flex items-center p-4 rounded-[20px] transition-all text-left w-full
              ${
                selectedRole === "provider"
                  ? "bg-white border-2 border-[#18181b] shadow-sm"
                  : "bg-white border-2 border-transparent shadow-sm shadow-gray-200/50 hover:border-gray-200"
              }`}
          >
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[14px] bg-[#18181b] mr-5">
              <div className="text-white">
                <BriefcaseIcon />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold text-[#18181b] leading-tight mb-1">
                I provide services
              </span>
              <span className="text-[14.5px] text-gray-500 leading-tight">
                Offer your skills and get hired
              </span>
            </div>
            {selectedRole === "provider" && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b]">
                <Check className="text-white" size={14} strokeWidth={3} />
              </div>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleNavigate()}
          className="primary-button mb-8"
        >
          Continue
        </button>

        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute w-full border-t border-gray-200"></div>
          <span className="relative bg-transparent px-4 text-[13px] font-semibold text-black uppercase tracking-wider">
            OR
          </span>
        </div>

        <div className="text-center">
          <span className="text-[15px] text-gray-800">
            Already have an account?{" "}
          </span>
          <Link
            to={`/login`}
            className="text-[15px] font-bold text-black hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
