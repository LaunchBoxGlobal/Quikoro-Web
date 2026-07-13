import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { LocationPinIcon, Map } from "../../../../../assets/export";

import Input from "../../../../../components/ui/Input";
import CurrencySelect from "../../../../../components/ui/CurrencySelect";
import DescriptionField from "../../../../../components/ui/DescriptionField";
import ImageUpload from "../../../../../components/ui/ImageUpload";
import AvailableDays from "./AvailableDays";
import { validationSchema, initialValues } from "./validation";
import Button from "../../../../../components/ui/Button";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../../../../../services/serviceApi/serviceApi";

import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_OPTIONS } from "../../../../../utils/categories";
import { DAYS } from "../../../../../utils/days";
import { CircleX } from "lucide-react";
import { useGetCategoriesQuery } from "../../../../../services/categoryApi/categoryApi";

export default function EditServiceForm({ service }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiError, setApiError] = useState("");
  const [existingImages, setExistingImages] = useState(service?.images || []);
  const [imagesError, setImagesError] = useState("");

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data;
  const categoryOptions =
    categories?.map((category) => ({
      label: category.name,
      value: category.name,
      id: category.id,
    })) || [];

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: service?.name || "",

      category: service?.category
        ? {
            label: service.category,
            value: service.category,
          }
        : null,

      description: service?.description || "",

      yearsOfExperience: service?.yearsOfExperience || "",

      // location: service?.location || "",

      availableDays: service?.availableDays || [],

      images: [],
    },

    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values) => {
      console.log(values);
      try {
        const totalImages = existingImages.length + values.images.length;

        if (totalImages < 1) {
          setImagesError("At least 1 image is required.");

          return;
        }

        if (totalImages > 5) {
          setImagesError("Maximum 5 images allowed.");

          return;
        }
        setImagesError("");
        setApiError("");

        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (values[key] !== null && values[key] !== undefined) {
            if (key === "availableDays") {
              formData.append(key, JSON.stringify(values[key]));
            } else if (key === "category") {
              formData.append(key, values[key]?.value);
            } else if (key === "images") {
              // existing image urls
              existingImages.forEach((image) => {
                // formData.append("existingImages", image);
                formData.append(
                  "existingImages",
                  JSON.stringify(existingImages),
                );
              });

              // newly uploaded files
              values.images.forEach((file) => {
                formData.append("images", file);
              });
            } else {
              formData.append(key, values[key]);
            }
          }
        });
        const res = await updateService({
          id,
          data: formData,
        }).unwrap();

        navigate(`/provider/my-services/${service?.id}`);
      } catch (error) {
        console.error("service update error >>> ", error);

        setApiError(
          error?.data?.message ||
            "Service could not be updated. Something went wrong.",
        );
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

  const handleRemoveExistingImage = (imageToRemove) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageToRemove));

    setImagesError("");
  };

  const handleRemoveNewImage = (indexToRemove) => {
    const updatedImages = formik.values.images.filter(
      (_, index) => index !== indexToRemove,
    );

    formik.setFieldValue("images", updatedImages);

    setImagesError("");
  };

  return (
    <>
      {apiError && (
        <div className="w-full mb-10">
          <FormErrorMessage apiError={apiError} />
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="w-full">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {/* Service Name */}
          <Input
            label="Service Name"
            name="name"
            placeholder="Enter service name"
            value={formik.values.name}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            bgColor="#f5f5f5"
          />

          {/* experience */}
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
            bgColor="#f5f5f5"
          />

          {/* Category + Experience */}
          <div>
            <CurrencySelect
              label="Category"
              options={categoryOptions}
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

          {/* Available Days */}
          <div className="space-y-1 md:col-span-1">
            <label className="text-sm font-semibold leading-none">
              Available Days
            </label>

            <div className="flex gap-2 flex-wrap">
              {DAYS?.map((day) => {
                const selected = formik.values.availableDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
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
              bgColor="#f5f5f5"
            />
          </div>

          {/* Images */}
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
                const totalImages =
                  existingImages.length +
                  formik.values.images.length +
                  files.length;

                if (totalImages > 5) {
                  setImagesError(
                    "Maximum 5 images allowed including existing images.",
                  );

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

            <div className="w-full flex gap-2 flex-wrap mt-3">
              {existingImages?.map((image, index) => (
                <div
                  key={`existing-${index}`}
                  className="w-[50px] h-[50px] rounded-lg border border-gray-200 relative"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    className="absolute -top-1 -right-1 bg-white rounded-full w-4 h-4"
                    onClick={() => handleRemoveExistingImage(image)}
                  >
                    <CircleX className="w-full h-full text-red-500" />
                  </button>
                </div>
              ))}

              {formik.values.images?.map((file, index) => {
                const preview = URL.createObjectURL(file);

                return (
                  <div
                    key={`new-${index}`}
                    className="w-[50px] h-[50px] rounded-lg border border-gray-200 relative"
                  >
                    <img
                      src={preview}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />

                    <button
                      type="button"
                      className="absolute -top-1 -right-1 bg-white rounded-full w-4 h-4"
                      onClick={() => handleRemoveNewImage(index)}
                    >
                      <CircleX className="w-full h-full text-red-500" />
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
              text="Save"
              loader="Saving..."
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </>
  );
}
