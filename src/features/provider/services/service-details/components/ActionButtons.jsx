import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteServiceMutation } from "../../../../../services/serviceApi/serviceApi";
import { enqueueSnackbar } from "notistack";

export default function ActionButtons({ service }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [deleteService, { isLoading, error }] = useDeleteServiceMutation();

  const handleDeleteService = async () => {
    if (!id) {
      enqueueSnackbar("ID not found", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
    try {
      await deleteService(id).unwrap();
      enqueueSnackbar("Service has been deleted successfully.", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/provider/my-services");
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.message ||
          "Something went wrong. Try again.",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
    }
  };

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <button
        type="button"
        disabled={isLoading}
        onClick={() => handleDeleteService()}
        className="flex-1 sm:flex-none rounded-xl bg-[#f05252] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-red-600"
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>

      <Link
        to={`/provider/my-services/edit-service/${service?.id}`}
        className="flex-1 sm:flex-none rounded-xl gradient-bg px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-black/90"
      >
        Edit
      </Link>
    </div>
  );
}
