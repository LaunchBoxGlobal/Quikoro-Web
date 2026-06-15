import { useState } from "react";
import { Star } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useWriteReviewMutation } from "../../../../../services/bookingApi/bookingApi";
import { enqueueSnackbar } from "notistack";

export default function ReviewModal({ isOpen, setIsOpen, booking }) {
  const [hoverRating, setHoverRating] = useState(0);
  const loggedInUser = useSelector((state) => state.user.user);
  const user =
    loggedInUser?.role === "CUSTOMER" ? booking?.provider : booking?.customer;
  const [writeReview, { isLoading }] = useWriteReviewMutation();
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const validationSchema = Yup.object({
    rating: Yup.number()
      .min(1, "Please select a rating")
      .required("Rating is required"),

    review: Yup.string()
      .trim()
      .required("Review is required")
      .min(10, "Review must be at least 10 characters")
      .max(500, "Review cannot exceed 500 characters"),
  });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          rating: values.rating,
          review: values.review,
          bookingId: booking?.id,
        };

        const res = await writeReview(payload).unwrap();

        if (res) {
          resetForm();
          setIsReviewSubmitted(true);
          setTimeout(() => {
            setIsReviewSubmitted(false);
            setIsOpen(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Review submission failed:", error);
        enqueueSnackbar(
          error?.data?.error ||
            error?.error ||
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
    },
  });

  const apiError =
    formik.submitCount > 0 && formik.isSubmitting === false && !formik.isValid;

  if (!isOpen) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] text-gray-900">
      {isReviewSubmitted ? (
        <ReviewSuccess />
      ) : (
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 w-full max-w-[460px] relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[24px] font-bold leading-none tracking-tight">
              Write Review
            </h2>

            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setIsOpen(false)}
              className="w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] custom-shadow rounded-lg flex items-center justify-center absolute top-4 right-4 z-30"
            >
              <CgClose />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-[72px] h-[72px] rounded-full border-2 border-[#00677F] p-1 shrink-0">
                <img
                  src={
                    user?.profilePicture
                      ? user.profilePicture
                      : "/user-profile-placeholder.png"
                  }
                  alt={user?.fullName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="text-[18px] font-semibold">
                {user?.fullName}
              </span>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h3 className="text-base font-medium mb-3">Your Rating</h3>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#00677F] rounded"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => formik.setFieldValue("rating", star)}
                  >
                    <Star
                      size={30}
                      strokeWidth={0}
                      className={
                        (hoverRating || formik.values.rating) >= star
                          ? "fill-[#00677F] text-[#00677F]"
                          : "fill-[#d4d4d4] text-[#d4d4d4]"
                      }
                    />
                  </button>
                ))}
              </div>

              {formik.touched.rating && formik.errors.rating && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.rating}
                </p>
              )}
            </div>

            {/* Review */}
            <div className="mb-2">
              <textarea
                name="review"
                value={formik.values.review}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full min-h-[180px] bg-[#f5f5f5] border-none rounded-2xl p-5 text-gray-800 placeholder-gray-400 outline-none resize-none"
                placeholder="Write your review..."
                aria-label="Review description"
              />

              <div className="flex justify-between items-center mt-2">
                <div>
                  {formik.touched.review && formik.errors.review && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.review}
                    </p>
                  )}
                </div>

                <span className="text-xs text-gray-500">
                  {formik.values.review.length}/500
                </span>
              </div>
            </div>

            {/* API Error */}
            {apiError && (
              <p className="text-red-500 text-sm mt-3">
                Please fix the validation errors above.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || formik.isSubmitting}
              className="primary-button mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || formik.isSubmitting ? "Submitting..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const ReviewSuccess = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 w-full max-w-[460px] relative flex flex-col items-center justify-center gap-4 text-center">
      <img
        src="/feedback-icon.png"
        alt="feedback-icon"
        width={106}
        height={106}
      />
      <h3 className="text-[24px] font-semibold leading-none tracking-tight">
        Thanks for Your Valuable Feedback
      </h3>
      <p className="text-[#888888] leading-[1.3] max-w-[80%]">
        Thank you for your valuable feedback. We appreciate your input and will
        use it to enhance our products and services.
      </p>
    </div>
  );
};
