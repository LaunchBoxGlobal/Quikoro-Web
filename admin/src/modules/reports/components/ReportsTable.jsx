import { FaCircleUser } from "react-icons/fa6";
import { useGetUsersQuery } from "../../../services/userApi/userApi";
import { Link, useSearchParams } from "react-router-dom";
import PageLoader from "../../../components/ui/PageLoader";
import ErrorPage from "../../../components/ui/PageError";
import Pagination from "../../../components/ui/Pagination";
import { getAddress } from "../../../utils/getAddress";
import EmptyState from "../../../components/ui/EmptyState";
import { FaUsersSlash } from "react-icons/fa";
import { useGetReportsQuery } from "../../../services/reportApi/reportApi";
import { GoReport } from "react-icons/go";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";
import ReportModal from "./ReportModal";

const ReportsTable = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const [reportModal, setReportModal] = useState(false);
  const [report, setReport] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useGetReportsQuery({
    search,
    page,
    limit: 10,
  });

  const users = data?.data;
  const pagination = data?.data?.pagination;

  if (isLoading || isFetching) return <PageLoader />;
  if (isError) return <ErrorPage onRetry={refetch} />;

  return (
    <>
      {users?.length > 0 ? (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base mt-10 custom-shadow bg-white rounded-[12px] lg:rounded-[24px] p-2 min-h-screen">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body rounded-base bg-[#013B4C]/10 rounded-[12px] lg:rounded-[24px]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium rounded-l-[16px]"
                >
                  Reporter
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Reported User
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Reported Reason
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium rounded-r-[16px]"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-neutral-primary border-b border-default"
                    >
                      <th className="px-6 py-4 font-normal whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {user?.reporter?.profilePictureUrl &&
                          user?.reporter?.profilePictureUrl !== "N/A" ? (
                            <img
                              src={user?.reporter?.profilePictureUrl}
                              alt="user-profile-image"
                              width={43}
                              height={43}
                              className="min-w-[43px] w-[43px] h-[43px] rounded-full object-cover"
                            />
                          ) : (
                            <FaCircleUser
                              size={43}
                              className="min-w-[43px] text-gray-700"
                            />
                          )}
                          <span>{user?.reporter?.name}</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 font-normal whitespace-nowrap flex items-center gap-2">
                        {user?.reported?.profilePictureUrl &&
                        user?.reported?.profilePictureUrl !== "N/A" ? (
                          <img
                            src={user?.reported?.profilePictureUrl}
                            alt="user-profile-image"
                            width={43}
                            height={43}
                            className="min-w-[43px] w-[43px] h-[43px] rounded-full object-cover"
                          />
                        ) : (
                          <FaCircleUser
                            size={43}
                            className="min-w-[43px] text-gray-700"
                          />
                        )}

                        <span>{user?.reported?.name}</span>
                      </th>
                      <td className="px-6 py-4">{user?.reason || "N/A"}</td>
                      <td className="px-6 py-4">
                        {formatDate(user?.reportedAt) || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setReport(user);
                            setReportModal((prev) => !prev);
                          }}
                          className="gradient-text font-medium underline decoration-[#0084AA]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <Pagination pagination={pagination} />
        </div>
      ) : (
        <EmptyState
          icon={GoReport}
          title="No Reports Found"
          description="There are currently no reports submitted."
        />
      )}

      {reportModal && report && (
        <ReportModal
          onclose={() => setReportModal(false)}
          report={report}
          setReport={setReport}
        />
      )}
    </>
  );
};

export default ReportsTable;
