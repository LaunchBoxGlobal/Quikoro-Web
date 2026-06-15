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
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../services/categoryApi/categoryApi";
import { formatDateToMonthYear } from "../../../utils/formatDate";
import AddCategory from "./AddCategory";
import { enqueueSnackbar } from "notistack";
import DeleteCategoryConfirmation from "./DeleteCategoryConfirmation";
import EditCategory from "./EditCategory";

const CategoriesTable = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const [status, setStatus] = useState("ALL");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [category, setCateogry] = useState(null);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleToggleAddCategoryModal = () =>
    setShowAddCategoryModal((prev) => !prev);

  const handleToggleEditCategoryModal = () =>
    setShowEditCategoryModal((prev) => !prev);

  const handleToggleDeleteCategoryModal = () =>
    setShowDeleteCategoryModal((prev) => !prev);

  const { data, isLoading, isError, refetch } = useGetCategoriesQuery(
    {
      search,
      page,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const users = data?.data;
  const pagination = data?.data?.pagination;

  if (isLoading) return <PageLoader />;
  if (isError) return <ErrorPage onRetry={refetch} />;

  return (
    <div className="w-full">
      <div className="w-full mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => handleToggleAddCategoryModal()}
          className="primary-button max-w-[160px]"
        >
          Add Category
        </button>
      </div>
      <div className="relative overflow-x-auto mt-5 bg-neutral-primary-soft shadow-xs rounded-base custom-shadow bg-white rounded-[12px] lg:rounded-[24px] p-2 min-h-screen">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body rounded-base bg-[#013B4C]/10 rounded-[12px] lg:rounded-[24px]">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-medium rounded-l-[16px]"
              >
                Category Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium rounded-r-[16px] text-end"
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
                      <span>{user?.name}</span>
                    </th>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDateToMonthYear(user?.createdAt)}
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => {
                          handleToggleEditCategoryModal();
                          setCateogry(user);
                        }}
                        className="disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <img
                          src="/edit-icon.png"
                          alt="edit-icon"
                          width={31}
                          height={31}
                        />
                      </button>
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => {
                          handleToggleDeleteCategoryModal();
                          setCateogry(user);
                        }}
                        className="disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <img
                          src="/delete-icon.png"
                          alt="delete-icon"
                          width={31}
                          height={31}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Pagination pagination={pagination} />
      </div>
      {showAddCategoryModal && (
        <AddCategory
          handleToggleAddCategoryModal={handleToggleAddCategoryModal}
        />
      )}

      {showEditCategoryModal && (
        <EditCategory
          category={category}
          handleToggleEditCategoryModal={handleToggleEditCategoryModal}
          setCateogry={setCateogry}
        />
      )}

      {showDeleteCategoryModal && (
        <DeleteCategoryConfirmation
          handleToggleDeleteCategoryModal={handleToggleDeleteCategoryModal}
          setCateogry={setCateogry}
          category={category}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
