import React, { useState } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../../signup/components/ImageUpload";
import DescriptionInput from "../../../../components/ui/DescriptionInput";
import CurrencySelect from "../../../../components/ui/CurrencySelect";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import LiveProfileCapture from "./LiveProfileCapture";
import { buyerValidationSchema, initialValues } from "../buyerValidation";
import { useGetUserProfileQuery } from "../../../../services/userService/userApi";
import "./styles.css";
import { IoMdArrowDropdown } from "react-icons/io";

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

const BuyerCompleteProfileForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [completeProfile, { isLoading }] = useCompleteProfileMutation();
  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.signup);
  const [preview, setPreview] = useState(null);
  const { data, refetch } = useGetUserProfileQuery();
  const user = data?.data;

  const formik = useFormik({
    initialValues: {
      ...initialValues,

      fullName: signupData?.fullName || user?.email || "",
      email: signupData?.email || user?.email || "",

      streetAddress: signupData?.address || "",
      description: signupData?.description || "",
    },

    enableReinitialize: true,

    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: buyerValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (values[key] !== null && values[key] !== undefined) {
            formData.append(key, values[key]);
          }
        });

        await completeProfile(formData).unwrap();
        const isCustomer = signupData
          ? signupData?.role
          : user
            ? user?.role
            : null;

        if (isCustomer && isCustomer === "CUSTOMER") {
          await refetch(); // NEW: wait for cache to update first
          navigate("/");
          dispatch(clearSignupData());
          return;
        } else {
          await refetch();
          navigate("/");
          dispatch(clearSignupData());
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

      <ImageUpload
        name="profilePicture"
        label="Upload Profile Picture"
        value={formik.values.profilePicture}
        touched={formik.touched.profilePicture}
        error={formik.errors.profilePicture}
        setFieldTouched={formik.setFieldTouched}
        onChange={(file) => {
          formik.setFieldValue("profilePicture", file);
          formik.setFieldTouched("profilePicture", true);
        }}
      />

      <div className="w-full space-y-5">
        <div className="w-full">
          {/* Full Name */}
          <Input
            label="Full Name"
            name="fullName"
            disabled={false}
            placeholder="Enter your full name"
            value={formik.values.fullName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && formik.errors.fullName}
            bgColor="#fff"
          />
        </div>

        <div className="w-full">
          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            disabled={true}
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            bgColor="#fff"
          />
        </div>

        <div className="w-full">
          {/* gender selector */}
          <div className="w-full flex flex-col gap-1 pt-2">
            <label className="text-sm font-semibold leading-none">Gender</label>

            <div className="relative w-full">
              <select
                name="gender"
                value={formik.values.gender || ""}
                onChange={(e) => {
                  formik.setFieldValue("gender", e.target.value);
                  formik.setFieldTouched("gender", true, false);
                }}
                onBlur={formik.handleBlur}
                className={`appearance-none w-full h-[49px] rounded-[12px] px-4 pr-12 bg-white outline-none text-sm ${
                  formik.touched.gender && formik.errors.gender
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <option value="" disabled>
                  Select gender
                </option>

                {GENDERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <IoMdArrowDropdown
                size={24}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.gender}
              </p>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold leading-none">
              Country
            </label>
            <CountrySelect
              containerClassName="w-full"
              inputClassName={`w-full bg-white border h-[39px] px-[15px] rounded-[8px] outline-none disabled:cursor-not-allowed 
        ${
          formik.touched.country && formik.errors.country
            ? "border-red-500"
            : "border-gray-200"
        }
      `}
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
              inputClassName={`w-full border h-[39px] px-[15px] rounded-[8px] outline-none 
        ${
          formik.touched.state && formik.errors.state
            ? "border-red-500"
            : "border-gray-200"
        }
      `}
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
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City */}
          <div className="w-full flex flex-col gap-1 pt-2">
            <label className="text-sm font-semibold leading-none">City</label>
            <CitySelect
              countryid={formik.values.countryId || 0}
              stateid={formik.values.stateId || 0}
              containerClassName="w-full"
              inputClassName={`w-full border h-[39px] px-[15px] rounded-[8px] outline-none 
        ${
          formik.touched.city && formik.errors.city
            ? "border-red-500"
            : "border-gray-200"
        }
      `}
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

          {/* Zip Code */}
          <Input
            label="Zip Code"
            name="zipCode"
            type="text"
            inputMode="numeric"
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
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default BuyerCompleteProfileForm;
