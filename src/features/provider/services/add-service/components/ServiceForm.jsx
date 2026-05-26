import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "../../../../../components/ui/Input";
import CurrencySelect from "../../../../../components/ui/CurrencySelect";
import DescriptionField from "../../../../../components/ui/DescriptionField";
import ImageUpload from "../../../../../components/ui/ImageUpload";
import CountryPicker from "../../../../../components/ui/CountryPicker";
import StatePicker from "../../../../../components/ui/StatePicker";
import CityPicker from "../../../../../components/ui/CityPicker";
import AvailableDays from "./AvailableDays";
import { validationSchema, initialValues } from "./validation";
import Button from "../../../../../components/ui/Button";
import { useCreateServiceMutation } from "../../../../../services/serviceApi/serviceApi";

import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useNavigate } from "react-router-dom";
import { CATEGORY_OPTIONS } from "../../../../../utils/categories";
import { DAYS } from "../../../../../utils/days";
import { CircleX } from "lucide-react";
import { LocationPinIcon, Map } from "../../../../../assets/export";

export default function ServiceForm() {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const [imagesError, setImagesError] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (values.images.length < 1) {
          setImagesError("At least 1 image is required.");

          return;
        }

        if (values.images.length > 5) {
          setImagesError("Maximum 5 images allowed.");

          return;
        }

        setImagesError("");

        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (values[key] !== null && values[key] !== undefined) {
            // available days
            if (key === "availableDays") {
              formData.append(key, JSON.stringify(values[key]));
            }

            // category object
            else if (key === "category") {
              formData.append(key, values[key].value);
            }

            // multiple images
            else if (key === "images") {
              values.images.forEach((file) => {
                formData.append("images", file);
              });
            }

            // normal fields
            else {
              formData.append(key, values[key]);
            }
          }
        });

        const res = await createService(formData);

        navigate(`/provider/my-services/${res?.data?.data?.id}`);

        // API CALL HERE
      } catch (error) {
        console.error("service creation error >>> ", error);
        setApiError("Service could not be created. Something went wrong.");
      }
    },
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, value);

    formik.setFieldTouched(name, true, false);

    await formik.validateField(name);
  };

  const toggleDay = (day) => {
    const exists = formik.values.availableDays.includes(day);

    let updatedDays = [];

    if (exists) {
      updatedDays = formik.values.availableDays.filter((d) => d !== day);
    } else {
      updatedDays = [...formik.values.availableDays, day];
    }

    formik.setFieldValue("availableDays", updatedDays);

    formik.setFieldTouched("availableDays", true);
  };

  const handleRemoveNewImage = (indexToRemove) => {
    const updatedImages = formik.values.images.filter(
      (_, index) => index !== indexToRemove,
    );

    formik.setFieldValue("images", updatedImages);
  };

  return (
    <>
      {apiError && <FormErrorMessage apiError={apiError} />}
      <form onSubmit={formik.handleSubmit} className="w-full">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
          {/* Service Name */}
          <Input
            label="Service Name"
            name="name"
            placeholder="Enter service name"
            value={formik.values.name}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
          />

          <div className="w-full">
            {/* location */}
            <Input
              label="Location"
              name="location"
              type="text"
              inputMode="text"
              placeholder="Enter your location"
              value={formik.values.location}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && formik.errors.location}
            />
          </div>

          <div className="w-full space-y-8">
            {/* Category */}
            <div>
              <CurrencySelect
                label="Category"
                options={CATEGORY_OPTIONS}
                value={formik.values.category}
                onChange={(val) => {
                  formik.setFieldValue("category", val);

                  formik.setFieldTouched("category", true);
                }}
                error={formik.touched.category && formik.errors.category}
                placeholder="Select category"
              />

              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Experience */}
            <Input
              label="Years Of Experience"
              name="yearsOfExperience"
              placeholder="Enter experience"
              value={formik.values.yearsOfExperience}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.yearsOfExperience &&
                formik.errors.yearsOfExperience
              }
            />
          </div>

          <div className="w-full">
            <div className="w-full bg-[var(--gray-bg)] rounded-[14px] p-4">
              <img src={Map} alt="map" width={541} height={110} />
              <div className="flex items-center justify-start gap-2 mt-4">
                <img src={LocationPinIcon} alt="" />
                <button type="button" className="text-sm font-medium">
                  Use my current Location
                </button>
              </div>
            </div>
          </div>

          {/* Available Days */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-semibold leading-none">
              Available Days
            </label>

            <div className="flex gap-2 flex-wrap">
              {DAYS.map((day) => {
                const selected = formik.values.availableDays.includes(day);

                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                      selected
                        ? "gradient-bg text-white"
                        : "bg-[#F5F5F5] text-gray-500"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {formik.touched.availableDays && formik.errors.availableDays && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.availableDays}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
          {/* Description */}
          <div>
            <DescriptionField
              label="Description"
              name="description"
              placeholder="Describe your service"
              value={formik.values.description}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && formik.errors.description}
            />
          </div>

          {/* Image Upload */}
          <div>
            <ImageUpload
              name="serviceImage"
              label="Upload Service Image"
              value={formik.values.images}
              touched={formik.touched.images}
              error={formik.errors.images}
              imagesError={imagesError}
              setFieldTouched={formik.setFieldTouched}
              onChange={(files) => {
                const totalImages = formik.values.images.length + files.length;

                if (totalImages > 5) {
                  setImagesError("Maximum 5 images allowed.");

                  return;
                }

                setImagesError("");

                formik.setFieldValue("images", [
                  ...formik.values.images,
                  ...files,
                ]);

                formik.setFieldTouched("images", true);
              }}
            />

            <div className="w-full flex items-center gap-2 flex-wrap relative mt-3">
              {formik.values.images?.map((file, index) => {
                const previewUrl = URL.createObjectURL(file);

                return (
                  <div
                    key={index}
                    className="w-[50px] h-[50px] bg-[#f5f5f5] rounded-lg relative border border-gray-200"
                  >
                    <img
                      src={previewUrl}
                      alt="service preview"
                      className="rounded-lg object-cover w-full h-full"
                    />

                    <button
                      type="button"
                      className="absolute -top-1 -right-1 bg-white rounded-full w-4 h-4"
                      onClick={() => handleRemoveNewImage(index)}
                    >
                      <CircleX color="#FB2943" className="w-full h-full" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full mt-10 flex justify-end">
          <div className="w-full max-w-[196px]">
            <Button
              type="submit"
              text={"Save"}
              loader="Saving..."
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </>
  );
}
