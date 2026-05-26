import React, { useState } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../../signup/components/ImageUpload";
import DescriptionInput from "../../../../components/ui/DescriptionInput";
import CurrencySelect from "../../../../components/ui/CurrencySelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationSchema, initialValues } from "../validation";
import { useCompleteProfileMutation } from "../../../../services/authApi/authApi";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { clearSignupData } from "../../../../services/authApi/authSlice";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { selectClassName } from "../../../../utils/selectClassName";
import { specialityOptions } from "../../../../utils/specialities";
import PhoneNumberInput from "../../../../components/ui/PhoneNumberInput";
import LiveProfileCapture from "./LiveProfileCapture";
import { CATEGORY_OPTIONS } from "../../../../utils/categories";
import { useGetUserProfileQuery } from "../../../../services/userService/userApi";

const GENDERS = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

const CompleteProfileForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [completeProfile, { isLoading }] = useCompleteProfileMutation();
  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.signup);
  const [preview, setPreview] = useState(null);

  const { data, refetch } = useGetUserProfileQuery();
  console.log("profile data >>> ", data?.data);

  const formik = useFormik({
    initialValues: {
      ...initialValues,

      fullName: signupData?.fullName || "",
      email: signupData?.email || "",

      // phoneNumber: signupData?.phoneNumber || "",
      streetAddress: signupData?.address || "",
      description: signupData?.description || "",
    },

    enableReinitialize: true,

    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          const value = values[key];

          if (
            key === "profilePicture" &&
            (!value || !(value instanceof File))
          ) {
            return;
          }

          if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value);
          }
        });

        await completeProfile(formData).unwrap();

        if (signupData?.role === "CUSTOMER") {
          navigate("/");
          dispatch(clearSignupData());
          refetch();
        } else {
          navigate("/provider/identity-verification");
          dispatch(clearSignupData());
          refetch();
        }
      } catch (error) {
        setApiError(
          error.data?.error ||
            error.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        );
      }
    },
  });

  const handleChange = async (e) => {
    if (apiError) {
      setApiError("");
    }
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true, false);
    await formik.validateField(name);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[500px] space-y-5"
    >
      <div className="w-full text-center mb-3">
        <h1 className="text-[32px] mt-5 font-bold leading-none">
          Complete Profile
        </h1>
      </div>

      {apiError && <FormErrorMessage apiError={apiError} />}

      <div className="w-full">
        <LiveProfileCapture
          preview={preview}
          setPreview={setPreview}
          onChange={(file) => {
            formik.setFieldValue("profilePicture", file);
            formik.setFieldTouched("profilePicture", true);
          }}
        />
        {formik.touched.profilePicture && formik.errors.profilePicture && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.profilePicture}
          </p>
        )}
      </div>

      <div className="w-full space-y-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <Input
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formik.values.fullName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && formik.errors.fullName}
            bgColor="#fff"
          />

          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            disabled={false}
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            bgColor="#fff"
          />

          {/* Speciality (CurrencySelect) */}
          <div className="w-full">
            <CurrencySelect
              label="Speciality"
              options={CATEGORY_OPTIONS}
              value={CATEGORY_OPTIONS.find(
                (item) => item.label.toUpperCase() === formik.values.speciality,
              )}
              onChange={(val) => {
                formik.setFieldValue("speciality", val.value.toUpperCase());

                formik.setFieldTouched("speciality", true);
              }}
              error={formik.touched.speciality && formik.errors.speciality}
              bgColor="#fff"
            />

            {formik.touched.speciality && formik.errors.speciality && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.speciality}
              </p>
            )}
          </div>

          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            placeholder=""
            value={formik.values.dateOfBirth}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            bgColor="#fff"
          />

          {/* gender */}
          <div className="w-full">
            <CurrencySelect
              label="Gender"
              options={GENDERS}
              value={GENDERS.find(
                (item) => item.value === formik.values.gender,
              )}
              onChange={(val) => {
                formik.setFieldValue("gender", val.value);
                formik.setFieldTouched("gender", true);
              }}
              error={formik.touched.gender && formik.errors.gender}
              bgColor="#fff"
            />

            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.gender}
              </p>
            )}
          </div>

          {/* Experience */}
          <Input
            label="Experience"
            name="yearsOfExperience"
            type="number"
            placeholder="Total experience in years"
            value={formik.values.yearsOfExperience}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.yearsOfExperience &&
              formik.errors.yearsOfExperience
            }
            bgColor="#fff"
          />

          {/* Country */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold leading-none">
              Country
            </label>
            <CountrySelect
              containerClassName="w-full"
              inputClassName={selectClassName(
                formik.touched.country && formik.errors.country,
              )}
              placeHolder="Select Country"
              value={formik.values.country}
              onChange={(val) => {
                formik.setFieldValue("country", val.name);
                formik.setFieldValue("countryId", val.id);

                formik.setFieldTouched("country", true);

                formik.setFieldValue("state", "");
                formik.setFieldValue("stateId", "");
                formik.setFieldValue("city", "");
              }}
              bgColor="#fff"
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.country}
              </p>
            )}
          </div>

          {/* State */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold leading-none">State</label>
            <StateSelect
              countryid={formik.values.countryId || 0}
              containerClassName="w-full"
              inputClassName={selectClassName(
                formik.touched.state && formik.errors.state,
              )}
              placeHolder="Select State"
              value={formik.values.state}
              onChange={(val) => {
                formik.setFieldValue("state", val.name);
                formik.setFieldValue("stateId", val.id);

                formik.setFieldTouched("state", true);

                formik.setFieldValue("city", "");
              }}
              bgColor="#fff"
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.state}</p>
            )}
          </div>

          {/* City */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold leading-none">City</label>
            <CitySelect
              countryid={formik.values.countryId || 0}
              stateid={formik.values.stateId || 0}
              containerClassName="w-full"
              inputClassName={selectClassName(
                formik.touched.city && formik.errors.city,
              )}
              placeHolder="Select City"
              value={formik.values.city}
              onChange={(val) => {
                formik.setFieldValue("city", val.name);

                formik.setFieldTouched("city", true);
              }}
              bgColor="#fff"
            />

            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
            )}
          </div>

          {/* Experience */}
          <Input
            label="Zip Code"
            name="zipCode"
            type="number"
            placeholder="Enter zip code"
            value={formik.values.zipCode}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zipCode && formik.errors.zipCode}
            bgColor="#fff"
          />
        </div>

        <div className="w-full">
          {/* Address */}
          <Input
            label="Street Address"
            name="streetAddress"
            placeholder="Enter your address"
            value={formik.values.streetAddress}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.streetAddress && formik.errors.streetAddress}
            bgColor="#fff"
          />
        </div>

        {/* Description */}
        <DescriptionInput
          label="Describe yourself"
          name="description"
          placeholder="Write something about yourself"
          value={formik.values.description}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && formik.errors.description}
          bgColor="#fff"
        />

        {/* Save & SKip buttons */}
        <div className="w-full flex items-center justify-end gap-4">
          <div className="w-full max-w-[186px]">
            <Button
              type="submit"
              text="Save"
              loader="Saving..."
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CompleteProfileForm;
