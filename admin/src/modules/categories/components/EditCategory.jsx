import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEditCategoryMutation } from "../../../services/categoryApi/categoryApi";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(25, "Category name must be less than 25 characters"),
});

const EditCategory = ({
  handleToggleEditCategoryModal,
  category,
  setCateogry,
}) => {
  const [editCategory, { isLoading }] = useEditCategoryMutation();

  const initialValues = {
    name: category?.name || "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await editCategory({
        id: category?.id,
        data: {
          name: values.name.trim(),
        },
      }).unwrap();
      enqueueSnackbar("Category has been updated successfully", {
        variant: "success",
      });
      setCateogry(null);
      resetForm();
      handleToggleEditCategoryModal();
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Failed to update category",
        {
          variant: "error",
        },
      );
    }
  };

  return (
    <div className="w-full min-h-screen px-5 flex items-center justify-center fixed inset-0 z-[100000] bg-[rgba(0,0,0,0.5)]">
      <div className="w-full max-w-[471px] rounded-[18px] bg-white p-5 relative">
        <div className="w-full flex items-center justify-between gap-4">
          <p className="text-[24px] font-semibold">Edit Category</p>

          <button type="button" onClick={handleToggleEditCategoryModal}>
            <img
              src="/close-icon.png"
              alt="close-icon"
              width={22}
              height={22}
            />
          </button>
        </div>

        <Formik
          enableReinitialize
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
                text="Update Category"
                loader="Updating..."
                isLoading={isLoading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCategory;
