import { useEffect, useState } from "react";
import { X, User } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Input from "../../../../components/ui/Input";
import Select from "./Select";
import ImageUpload from "../../../auth/signup/components/ImageUpload";
import { useEditProfileMutation } from "../../../../services/userService/userApi";
import { enqueueSnackbar } from "notistack";
import { specialityOptions } from "../../../../utils/specialities";
import { editProfileSchema } from "./validation";
import { CATEGORY_OPTIONS } from "../../../../utils/categories";
import "./styles.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  refetch,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const [editProfile, { isLoading, error }] = useEditProfileMutation();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      speciality: profile?.speciality || "",
      dateOfBirth: profile?.dateOfBirth
        ? profile.dateOfBirth.split("T")[0]
        : "",

      gender: profile?.gender || "",

      profilePicture:
        profile?.profilePictureUrl || profile?.profilePicture || "",

      country: profile?.country || "",
      countryId: "",

      state: profile?.state || "",
      stateId: "",

      city: profile?.city || "",

      zipCode: profile?.zipCode || "",

      streetAddress: profile?.streetAddress || "",

      yearsOfExperience: profile?.yearsOfExperience || "",

      description: profile?.description || "",
    },

    validationSchema: editProfileSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (
            key !== "countryId" &&
            key !== "stateId" &&
            value !== null &&
            value !== undefined
          ) {
            formData.append(key, value);
          }
        });

        await editProfile(formData).unwrap();
        refetch();

        onClose();
      } catch (err) {
        enqueueSnackbar(
          err?.data?.error ||
            err?.message ||
            "Something went wrong while updating your profile.",
          {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          },
        );
        console.log(err);
      }
    },
  });

  if (!isOpen) return null;

  useEffect(() => {
    if (!profile) return;
    async function prefillLocation() {
      try {
        const countries = await GetCountries();

        const selectedCountry = countries.find(
          (item) => item.name.toLowerCase() === profile.country?.toLowerCase(),
        );

        if (!selectedCountry) return;

        formik.setFieldValue("country", selectedCountry.name);

        formik.setFieldValue("countryId", selectedCountry.id);

        const states = await GetState(selectedCountry.id);

        const selectedState = states.find(
          (item) => item.name.toLowerCase() === profile.state?.toLowerCase(),
        );

        if (!selectedState) return;

        formik.setFieldValue("state", selectedState.name);

        formik.setFieldValue("stateId", selectedState.id);

        const cities = await GetCity(selectedCountry.id, selectedState.id);

        const selectedCity = cities.find(
          (item) => item.name.toLowerCase() === profile.city?.toLowerCase(),
        );

        if (selectedCity) {
          formik.setFieldValue("city", selectedCity.name);
        }
      } catch (err) {
        console.log(err);
      }
    }
    prefillLocation();
  }, [profile]);

  const selectClassName = (error) =>
    `w-full rounded-xl border px-4 py-3 ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4 py-20">
      <div className="flex min-h-full items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="relative w-full max-w-[1100px] rounded-[2.5rem] bg-white p-8 lg:p-14"
        >
          {/* HEADER */}

          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Edit Profile Details</h2>

            <button type="button" onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row">
            {/* LEFT */}

            <div className="flex-1">
              <div className="mb-8">
                <input
                  type="file"
                  id="profilePicture"
                  hidden
                  accept="image/png,image/jpeg, image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const allowedTypes = [
                      "image/png",
                      "image/jpeg",
                      "image/jpg",
                    ];
                    if (!allowedTypes.includes(file.type)) {
                      return;
                    }
                    const maxSize = 5 * 1024 * 1024;
                    if (file.size > maxSize) {
                      return;
                    }
                    formik.setFieldValue("profilePicture", file);
                    formik.setFieldTouched("profilePicture", true);
                  }}
                />

                {profile?.profilePicture || formik.values.profilePicture ? (
                  <div className="w-full flex items-center gap-4">
                    <label
                      htmlFor="profilePicture"
                      className="w-[116px] h-[116px] rounded-full overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:opacity-80 transition"
                    >
                      <img
                        src={
                          formik.values.profilePicture instanceof File
                            ? URL.createObjectURL(formik.values.profilePicture)
                            : profile?.profilePicture
                        }
                        alt="profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </label>
                    <label
                      htmlFor="profilePicture"
                      className="font-medium underline text-[#008CFF] cursor-pointer"
                    >
                      Change profile picture
                    </label>
                  </div>
                ) : (
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
                )}
              </div>

              <div className="space-y-5">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && formik.errors.fullName}
                  bgColor="#f5f5f5"
                />

                <Input
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  bgColor="#f5f5f5"
                />

                <Select
                  label="Speciality"
                  name="speciality"
                  value={formik.values.speciality}
                  onChange={formik.handleChange}
                  options={CATEGORY_OPTIONS}
                  bgColor="#f5f5f5"
                />

                {profile && profile?.role === "PROVIDER" && (
                  <Input
                    type="date"
                    label="Date Of Birth"
                    name="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    bgColor="#f5f5f5"
                  />
                )}
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex-1 space-y-5">
              {/* COUNTRY */}
              <div>
                <label>Country</label>
                <CountrySelect
                  containerClassName="w-full"
                  inputClassName={selectClassName(formik.errors.country)}
                  placeHolder="Select Country"
                  defaultValue={
                    formik.values.country
                      ? {
                          name: formik.values.country,
                        }
                      : null
                  }
                  onChange={(val) => {
                    formik.setFieldValue("country", val.name);

                    formik.setFieldValue("countryId", val.id);

                    formik.setFieldValue("state", "");

                    formik.setFieldValue("stateId", "");

                    formik.setFieldValue("city", "");
                  }}
                />
              </div>

              {/* STATE + CITY */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label>State</label>
                  <StateSelect
                    countryid={formik.values.countryId || undefined}
                    containerClassName="w-full"
                    inputClassName={selectClassName(formik.errors.state)}
                    placeHolder="Select State"
                    defaultValue={
                      formik.values.state
                        ? {
                            name: formik.values.state,
                          }
                        : null
                    }
                    onChange={(val) => {
                      formik.setFieldValue("state", val.name);

                      formik.setFieldValue("stateId", val.id);

                      formik.setFieldValue("city", "");
                    }}
                  />
                </div>

                <div>
                  <label>City</label>
                  <CitySelect
                    countryid={formik.values.countryId || undefined}
                    stateid={formik.values.stateId || undefined}
                    containerClassName="w-full"
                    inputClassName={selectClassName(formik.errors.city)}
                    placeHolder="Select City"
                    defaultValue={
                      formik.values.city
                        ? {
                            name: formik.values.city,
                          }
                        : null
                    }
                    onChange={(val) => {
                      formik.setFieldValue("city", val.name);
                    }}
                  />
                </div>
              </div>

              <Input
                label="Zip Code"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                bgColor="#f5f5f5"
              />

              <Input
                label="Street Address"
                name="streetAddress"
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
                bgColor="#f5f5f5"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  options={[
                    {
                      label: "Male",
                      value: "MALE",
                    },

                    {
                      label: "Female",
                      value: "FEMALE",
                    },
                  ]}
                />

                <Input
                  label="Experience"
                  name="yearsOfExperience"
                  value={formik.values.yearsOfExperience}
                  onChange={formik.handleChange}
                  bgColor="#f5f5f5"
                />
              </div>

              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Description"
                className="w-full min-h-[150px] rounded-xl p-4 bg-[#f5f5f5]"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#F2F2F2] w-full max-w-[168px] h-[48px] px-5 text-black rounded-[12px] font-medium shadow-sm flex items-center justify-center"
                >
                  Cancel
                </button>

                <div className="w-full max-w-[168px]">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="primary-button"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
