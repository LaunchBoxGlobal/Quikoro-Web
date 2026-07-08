import { FaCircleUser } from "react-icons/fa6";
import { useGetUsersQuery } from "../../../services/userApi/userApi";
import { Link, useSearchParams } from "react-router-dom";
import PageLoader from "../../../components/ui/PageLoader";
import ErrorPage from "../../../components/ui/PageError";
import Pagination from "../../../components/ui/Pagination";
import { getAddress } from "../../../utils/getAddress";
import { ACCONUT_STATUSES } from "../../../constants/acount-status";
import PageHeader from "../../../components/ui/PageHeader";
import { useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import { FaUsersSlash } from "react-icons/fa";

const ProvidersTable = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const [status, setStatus] = useState("ALL");

  const { data, isLoading, isError, isFetching } = useGetUsersQuery(
    {
      search,
      page,
      status: status === "ALL" ? null : status,
      url: "providers",
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const users = data?.data?.data;
  const pagination = data?.data?.pagination;

  // if (isLoading || isFetching) return <PageLoader />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full relative">
      <PageHeader title={"Service Provider"} />

      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <>
          {/* STATUS */}
          <div className="w-full my-7 flex items-center gap-3">
            {ACCONUT_STATUSES.map((s) => {
              return (
                <button
                  type="button"
                  key={s.key}
                  onClick={() => setStatus(s?.key)}
                  className={`font-medium ${status === s.key ? "gradient-text underline" : ""}`}
                >
                  {s?.title}
                </button>
              );
            })}
          </div>

          {users && users?.length > 0 ? (
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base custom-shadow bg-white rounded-[12px] lg:rounded-[24px] p-2 min-h-screen">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body rounded-base bg-[#013B4C]/10 rounded-[12px] lg:rounded-[24px]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium rounded-l-[16px]"
                    >
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Status
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
                          <th className="px-6 py-4 font-normal whitespace-nowrap flex items-center gap-2">
                            {user?.profilePicture &&
                            user?.profilePicture !== "N/A" ? (
                              <img
                                src={user?.profilePicture}
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

                            <span>{user?.fullName}</span>
                          </th>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user?.email}
                          </td>
                          <td className="px-6 py-4 ">
                            {getAddress(user) || "N/A"}
                          </td>
                          <td className="px-6 py-4">{user?.accountStatus}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              to={`/service-providers/details/${user?.id}`}
                              className="gradient-text font-medium underline decoration-[#0084AA]"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <div className="w-full px-4 pb-3">
                <Pagination pagination={pagination} />
              </div>
            </div>
          ) : (
            <EmptyState
              icon={FaUsersSlash}
              title="No Service Providers Found"
              description="There are currently no service providers in the system."
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProvidersTable;
