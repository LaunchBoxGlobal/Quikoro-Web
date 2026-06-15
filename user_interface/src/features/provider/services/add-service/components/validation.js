import * as Yup from "yup";

export const initialValues = {
  name: "",
  category: null,
  yearsOfExperience: "",
  // price: "",

  // country: "",
  // countryId: "",
  // state: "",
  // stateId: "",
  // city: "",
  // zipCode: "",
  location: "",

  availableDays: [],

  description: "",

  images: [],
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

  // price: Yup.number()
  //   .typeError("Must be a number")
  //   .min(1, "Invalid price")
  //   .required("Price is required"),

  // country: Yup.string().required("Country is required"),

  // state: Yup.string().required("State is required"),

  // city: Yup.string().required("City is required"),

  // zipCode: Yup.string()
  //   .matches(/^[0-9]+$/, "Only digits are allowed")
  //   .min(4, "Invalid zip code")
  //   .max(10, "Invalid zip code")
  //   .required("Zip code is required"),

  availableDays: Yup.array()
    .min(1, "Please select at least one day")
    .required("Available days are required"),

  description: Yup.string()
    .min(10, "At least 10 characters")
    .max(500, "Maximum 500 characters allowed")
    .required("Description is required"),

  images: Yup.mixed().required("Service image is required"),
  location: Yup.string()
    .required("Street address required")
    .min(3, "Address cannot be less than 3 characters")
    .max(30, "Address cannot be more than 30 characters"),
});
