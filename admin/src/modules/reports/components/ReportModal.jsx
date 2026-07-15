import { X } from "lucide-react";
import React from "react";
import { formatDate } from "../../../utils/formatDate";
import { enqueueSnackbar } from "notistack";
import { useBanUnbanReportedUserMutation } from "../../../services/reportApi/reportApi";

const ReportModal = ({ report, setReport, onclose }) => {
  const [banUnbanUser, { isLoading }] = useBanUnbanReportedUserMutation();

  const handleBanToggle = async () => {
    try {
      await banUnbanUser({
        userId: report?.reported?.id,
        isBanned: !report?.reported?.isBanned,
      }).unwrap();

      enqueueSnackbar("User status has been updated!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3500,
      });

      // Update local state so the toggle reflects the new value immediately
      setReport((prev) => ({
        ...prev,
        reported: {
          ...prev.reported,
          isBanned: !prev.reported.isBanned,
        },
      }));
    } catch (err) {
      enqueueSnackbar(
        err?.data?.message || err?.error?.message || "Something went wrong!",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3500,
        },
      );
    }
  };
  return (
    <div className="w-full min-h-screen px-5 py-10 fixed inset-0 z-[100000] bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="w-full max-w-[461px] bg-white rounded-[16px] p-6 relative">
        <div className="w-full flex items-center justify-between gap-4">
          <h3 className="text-[24px] font-semibold leading-none">
            User Report
          </h3>
          <button
            type="button"
            onClick={() => {
              setReport(null);
              onclose();
            }}
          >
            <X className="text-gray-500" />
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-6">
          <div className="text-start space-y-2">
            <h4 className="">Reporter</h4>
            <div className="flex items-center gap-2">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden relative border border-cyan-600 p-0.5">
                <img
                  src={
                    report?.reporter?.profilePictureUrl
                      ? report?.reporter?.profilePictureUrl
                      : "/admin-profile-image.png"
                  }
                  alt={`${report?.reporter?.name} profile picture`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="font-medium">{report?.reporter?.name}</p>
            </div>
          </div>
          <div className="text-start space-y-2">
            <h4 className="">Reported Date</h4>
            <p className="font-medium text-[#6D6D6D]">
              {formatDate(report?.reportedAt)}
            </p>
          </div>
        </div>

        <hr className="w-full my-3" />

        <div className="w-full space-y-3">
          <h4 className="">Description</h4>
          <p className="text-[#6D6D6D]">{report?.description}</p>
        </div>

        <hr className="w-full my-3" />

        <div className="w-full flex items-start justify-between">
          <div className="text-start space-y-2">
            <h4 className="">Reported User</h4>
            <div className="flex items-center gap-2">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden relative border border-cyan-600 p-0.5">
                <img
                  src={
                    report?.reported?.profilePictureUrl
                      ? report?.reported?.profilePictureUrl
                      : "/admin-profile-image.png"
                  }
                  alt={`${report?.reported?.name} profile picture`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="font-medium">{report?.reported?.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 relative top-0.5">
            <label htmlFor="" className="font-semibold">
              {report?.reported?.isBanned ? "Enable" : "Disable"}
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={report?.reported?.isBanned || false}
                onChange={handleBanToggle}
                disabled={isLoading}
              />

              <div className="relative w-11 h-[25px] bg-gray-200 rounded-full peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[1.5px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-l from-[#0084AA] to-[#003544]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
