import { IoWifiOutline } from "react-icons/io5";

const NoInternet = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="w-full max-w-md bg-transparent text-center">
        <div className="flex justify-center mb-4">
          <div className="gradient-bg rounded-full w-16 h-16 flex items-center justify-center">
            <IoWifiOutline className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          No Internet Connection
        </h1>
      </div>
    </div>
  );
};

export default NoInternet;
