import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useDeleteCategoryMutation } from "../../../services/categoryApi/categoryApi";
import { createPortal } from "react-dom";

const DeleteCategoryConfirmation = ({
  handleToggleDeleteCategoryModal,
  category,
  setCateogry,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDeleteCategory = async () => {
    if (!category?.id) {
      enqueueSnackbar("Category ID not found", {
        variant: "error",
      });
      return;
    }

    try {
      await deleteCategory(category.id).unwrap();

      // Show success state immediately
      setIsDeleted(true);

      // enqueueSnackbar("Category deleted successfully", {
      //   variant: "success",
      // });

      // Clear selected category
      setCateogry(null);

      // Auto close modal after 2 seconds
      setTimeout(() => {
        handleToggleDeleteCategoryModal();
      }, 2000);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Failed to delete category.",
        {
          variant: "error",
        },
      );
    }
  };

  return createPortal(
    <div className="w-full min-h-screen px-5 flex items-center justify-center fixed inset-0 z-[100000] bg-[rgba(0,0,0,0.5)]">
      <div className="w-full max-w-[471px] rounded-[18px] bg-white p-5 lg:p-10 relative flex flex-col items-center justify-center gap-3">
        <img
          src={isDeleted ? "/check-icon.png" : "/delete-category-icon.png"}
          alt={isDeleted ? "check-icon" : "delete-category-icon"}
          width={106}
          height={106}
        />

        <p className="text-[24px] font-semibold">
          {isDeleted ? "Category Deleted" : "Delete Category"}
        </p>

        <p className="text-[16px] font-normal text-[#888888] text-center">
          {isDeleted
            ? "Category has been deleted successfully!"
            : "Are you sure you want to delete this category?"}
        </p>

        {!isDeleted && (
          <div className="w-full grid grid-cols-2 gap-3 mt-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleToggleDeleteCategoryModal}
              className="secondary-button"
            >
              No
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleDeleteCategory}
              className="primary-button"
            >
              {isLoading ? "Deleting..." : "Yes"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default DeleteCategoryConfirmation;
