import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../../../components/ui/Button";
import { IDCard } from "../../../../assets/export";
import { useVerifyIdentityMutation } from "../../../../services/authApi/authApi";
import { useNavigate } from "react-router-dom";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";

const validationSchema = Yup.object({
  cardFront: Yup.mixed()
    .required("Front side of CNIC is required")
    .test("fileType", "Only JPG, JPEG and PNG files are allowed", (value) => {
      if (!value) return false;

      return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
    })
    .test("fileSize", "Image size must be less than 20MB", (value) => {
      if (!value) return false;

      return value.size <= 20 * 1024 * 1024;
    }),

  cardBack: Yup.mixed()
    .required("Back side of CNIC is required")
    .test("fileType", "Only JPG, JPEG and PNG files are allowed", (value) => {
      if (!value) return false;

      return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
    })
    .test("fileSize", "Image size must be less than 20MB", (value) => {
      if (!value) return false;

      return value.size <= 20 * 1024 * 1024;
    }),
});

export default function IdentityVerificationForm() {
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [verifyIdentity, { isLoading }] = useVerifyIdentityMutation();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      cardFront: null,
      cardBack: null,
    },

    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("cardFront", values.cardFront);
        formData.append("cardBack", values.cardBack);

        // API CALL HERE
        const res = await verifyIdentity(formData).unwrap();

        resetForm();

        navigate("/");

        console.log("Submitting FormData...");
      } catch (error) {
        setApiError(
          error?.error || error?.data?.error || "Something went wrong.",
        );
        console.error("Identity verification error:", error);
      }
    },
  });

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files?.[0];

    if (!file) return;

    formik.setFieldValue(fieldName, file, true);
    formik.setFieldTouched(fieldName, true, false);

    const previewUrl = URL.createObjectURL(file);

    if (fieldName === "cardFront") {
      if (frontPreview) {
        URL.revokeObjectURL(frontPreview);
      }

      setFrontPreview(previewUrl);
    }

    if (fieldName === "cardBack") {
      if (backPreview) {
        URL.revokeObjectURL(backPreview);
      }

      setBackPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (frontPreview) {
        URL.revokeObjectURL(frontPreview);
      }

      if (backPreview) {
        URL.revokeObjectURL(backPreview);
      }
    };
  }, [frontPreview, backPreview]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex justify-center py-10 lg:py-0"
    >
      <div className="w-full max-w-[440px] flex flex-col">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src={IDCard}
            alt="ID card image"
            width={171}
            height={122}
            className="object-contain grayscale"
          />
        </div>

        {/* Heading */}
        <div className="w-full text-center mb-10">
          <h1 className="text-[32px] font-bold text-black tracking-tight mb-2">
            Identity Verification
          </h1>

          <p className="text-[16px] text-[#565656]">
            Upload front and back side of your CNIC
          </p>
        </div>

        {apiError && (
          <div className="mb-10">
            <FormErrorMessage apiError={apiError} />
          </div>
        )}
        {/* Upload Boxes */}
        <div className="w-full flex flex-col gap-8 mb-10">
          {/* Front */}
          <div className="w-full">
            <label className="block text-[14px] font-medium text-black mb-1">
              Upload Front Image
            </label>

            <label
              htmlFor="cardFront"
              className={`w-full min-h-[180px] border border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors overflow-hidden bg-white ${
                formik.touched.cardFront && formik.errors.cardFront
                  ? "border-red-500"
                  : "border-gray-400 hover:bg-gray-50"
              }`}
            >
              {frontPreview ? (
                <img
                  src={frontPreview}
                  alt="CNIC Front"
                  className="w-full h-[180px] object-cover rounded-xl"
                />
              ) : (
                <>
                  <span className="text-[16px] text-black font-medium mb-1.5">
                    Upload Front Side of CNIC
                  </span>

                  <span className="text-[14px] text-gray-500">
                    Upto 20MB JPG, PNG
                  </span>
                </>
              )}
            </label>

            <input
              id="cardFront"
              name="cardFront"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={(e) => handleImageChange(e, "cardFront")}
            />

            {formik.touched.cardFront && formik.errors.cardFront && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.cardFront}
              </p>
            )}
          </div>

          {/* Back */}
          <div className="w-full">
            <label className="block text-[14px] font-medium text-black mb-1">
              Upload Back Image
            </label>

            <label
              htmlFor="cardBack"
              className={`w-full min-h-[180px] border border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors overflow-hidden bg-white ${
                formik.touched.cardBack && formik.errors.cardBack
                  ? "border-red-500"
                  : "border-gray-400 hover:bg-gray-50"
              }`}
            >
              {backPreview ? (
                <img
                  src={backPreview}
                  alt="CNIC Back"
                  className="w-full h-[180px] object-cover rounded-xl"
                />
              ) : (
                <>
                  <span className="text-[16px] text-black font-medium mb-1.5">
                    Upload Back Side of CNIC
                  </span>

                  <span className="text-[14px] text-gray-500">
                    Upto 20MB JPG, PNG
                  </span>
                </>
              )}
            </label>

            <input
              id="cardBack"
              name="cardBack"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={(e) => handleImageChange(e, "cardBack")}
            />

            {formik.touched.cardBack && formik.errors.cardBack && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.cardBack}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          text={"Next"}
          isLoading={isLoading}
          loader="Uploading..."
        />
      </div>
    </form>
  );
}
