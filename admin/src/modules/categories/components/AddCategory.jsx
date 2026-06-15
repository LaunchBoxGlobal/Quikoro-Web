import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useCreateCategoryMutation } from "../../../services/categoryApi/categoryApi";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(25, "Category name must be less than 25 characters"),
});

const AddCategory = ({ handleToggleAddCategoryModal }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const initialValues = {
    name: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createCategory(values).unwrap();

      resetForm();
      setIsAdded(true);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message ||
          error?.data?.error ||
          "Failed to create category",
        {
          variant: "error",
        },
      );
    }
  };

  return (
    <div className="w-full min-h-screen px-5 flex items-center justify-center fixed inset-0 z-[100000] bg-[rgba(0,0,0,0.5)]">
      <div className="w-full max-w-[471px] rounded-[18px] bg-white p-5 relative">
        {isAdded ? (
          <div className="w-full relative flex flex-col items-center justify-center gap-3 text-center p-5">
            <button
              type="button"
              onClick={() => {
                handleToggleAddCategoryModal();
                setIsAdded(false);
              }}
              className="absolute top-2 right-2 z-10"
            >
              <img
                src="/close-icon.png"
                alt="close icon"
                width={22}
                height={22}
              />
            </button>
            <img
              src="/check-icon.png"
              alt="check icon"
              width={106}
              height={106}
            />
            <p className="font-semibold text-[24px] leading-none">
              Category Successfully Added
            </p>
            <p className="text-[#565656]">
              The new category has been successfully added to your system. You
              can now assign products or services under this category to keep
              your listings well organized.
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-between gap-4">
              <p className="text-[24px] font-semibold">Add New Category</p>

              <button type="button" onClick={handleToggleAddCategoryModal}>
                <img
                  src="/close-icon.png"
                  alt="close-icon"
                  width={22}
                  height={22}
                />
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="w-full mt-5 space-y-5">
                  <Input
                    name="name"
                    value={values.name}
                    placeholder="Enter category name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name ? errors.name : ""}
                  />

                  <Button
                    type="submit"
                    text="Add Category"
                    loader="Adding..."
                    isLoading={isLoading}
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
