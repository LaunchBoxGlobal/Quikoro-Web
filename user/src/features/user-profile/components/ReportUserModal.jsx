import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CgClose } from "react-icons/cg";
import Button from "../../../components/ui/Button";
import { useReportUserMutation } from "../../../services/userService/userApi";
import { enqueueSnackbar } from "notistack";

const REPORT_REASONS = [
  "Unprofessional Behavior",
  "Poor Communication",
  "Fake or Impersonating Account",
  "Harassment or Bullying",
  "Abuse or Misconduct",
  "Violation Policies",
  "Other",
];

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const validationSchema = Yup.object({
  reason: Yup.string().required("Please select a reason"),

  description: Yup.string()
    .trim()
    .required("Please provide details")
    .min(10, "At least 10 characters")
    .max(1000, "Maximum 1000 characters allowed"),

  media: Yup.array()
    .max(5, "Maximum 5 images allowed")
    .test("fileType", "Only PNG, JPG and JPEG files are allowed", (files) => {
      if (!files?.length) return true;

      return files.every((file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      );
    })
    .test("fileSize", "Each image must be less than 4MB", (files) => {
      if (!files?.length) return true;

      return files.every((file) => file.size <= 4 * 1024 * 1024);
    }),
});

const ReportUserModal = ({
  onClose,
  reportedId,
  setShowReportSuccessModal,
}) => {
  const [reportUser, { isLoading }] = useReportUserMutation();

  const formik = useFormik({
    initialValues: {
      reason: "",
      description: "",
      media: [],
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("reportedId", reportedId);

        formData.append(
          "reason",
          values.reason === "Other" ? "Other" : values.reason,
        );

        formData.append("description", values.description || "");

        values.media.forEach((file) => {
          formData.append("screenshots", file);
        });

        await reportUser(formData).unwrap();

        onClose();
        setShowReportSuccessModal(true);
      } catch (error) {
        enqueueSnackbar(
          error?.data?.error ||
            error?.error ||
            "Something went wrong. Try again.",
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 3000,
            variant: "error",
          },
        );
        onClose();
        // console.error(error);
      }
    },
  });

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files || []);

    const updatedFiles = [...formik.values.media, ...newFiles];

    formik.setFieldValue("media", updatedFiles);
    formik.setFieldTouched("media", true);

    // allows selecting the same file again
    e.target.value = "";
  };

  const removeImage = (index) => {
    const updatedFiles = [...formik.values.media];

    updatedFiles.splice(index, 1);

    formik.setFieldValue("media", updatedFiles);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 py-20 min-h-screen">
      {/* overlay */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* modal */}
      <div className="min-h-full flex justify-center p-4 md:p-8">
        <form
          onSubmit={formik.handleSubmit}
          className="relative bg-[#EDF1F2] rounded-2xl w-full max-w-md py-6 lg:py-10 px-5 lg:px-10 animate-scaleIn"
        >
          <button
            type="button"
            onClick={onClose}
            className="w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] custom-shadow rounded-lg flex items-center justify-center absolute top-4 right-4 z-30"
          >
            <CgClose />
          </button>

          <h2 className="text-[24px] font-bold mt-4">Report User</h2>

          <ul className="w-full space-y-3 my-5">
            {REPORT_REASONS.map((reason) => (
              <li key={reason} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={reason}
                  name="reason"
                  value={reason}
                  checked={formik.values.reason === reason}
                  onChange={formik.handleChange}
                  className="w-4 h-4"
                />

                <label htmlFor={reason}>{reason}</label>
              </li>
            ))}
          </ul>

          {formik.touched.reason && formik.errors.reason && (
            <p className="text-red-500 text-xs mb-3">{formik.errors.reason}</p>
          )}

          {/* {formik.values.reason === "Other" && ( */}
          <div className="mb-4">
            <textarea
              name="description"
              rows={4}
              placeholder="Please provide details..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-lg custom-shadow p-3 resize-none outline-none"
            />

            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>
          {/* )} */}

          {/* Media Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Attach Images (Optional)
            </label>

            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              multiple
              onChange={handleFileChange}
              disabled={formik.values.media.length >= 5}
            />

            <p className="text-xs text-gray-500 mt-1">
              Maximum 5 images. PNG, JPG, JPEG only. Max size: 4MB each.
            </p>

            {formik.errors.media && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.media}</p>
            )}

            {formik.values.media?.length > 0 && (
              <div className="flex items-center flex-wrap gap-3 mt-4">
                {formik.values.media.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="relative rounded-lg h-14 w-14"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-14 w-14 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-gray-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xl"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2 text-sm text-gray-600">
              {formik.values.media.length}/5 image(s) selected
            </div>
          </div>

          <Button
            type="submit"
            text="Submit"
            isLoading={isLoading}
            loader="Submitting..."
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default ReportUserModal;
