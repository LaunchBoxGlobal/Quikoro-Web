import * as Yup from "yup";

export const initialValues = {
  name: "",
  category: null,
  yearsOfExperience: "",

  location: "",

  availableDays: [],

  description: "",

  images: null,
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Service name is required"),

  category: Yup.object().nullable().required("Category is required"),

  yearsOfExperience: Yup.number()
    .typeError("Must be a number")
    .min(0, "Invalid experience")
    .max(60, "Invalid experience")
    .required("Experience is required"),

  availableDays: Yup.array()
    .min(1, "Please select at least one day")
    .required("Available days are required"),

  description: Yup.string()
    .min(10, "At least 10 characters")
    .max(500, "Maximum 500 characters allowed")
    .required("Description is required"),

  images: Yup.mixed().required("Service image is required"),
  // location: Yup.string()
  //   .required("Street address required")
  //   .min(3, "Address cannot be less than 3 characters")
  //   .max(30, "Address cannot be more than 30 characters"),
});
