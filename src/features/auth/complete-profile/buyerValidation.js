import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const initialValues = {
  profilePicture: null,

  fullName: "",
  email: "",

  gender: "",

  country: "",
  countryId: "",

  state: "",
  stateId: "",

  city: "",

  streetAddress: "",
  zipCode: "",

  description: "",
};

export const buyerValidationSchema = Yup.object({
  profilePicture: Yup.mixed().required("Profile picture is required"),

  fullName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(25, "Name cannot exceed 25 characters")
    .required("Full name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  gender: Yup.string().required("Gender is required"),

  country: Yup.string().required("Country is required"),

  state: Yup.string().required("State is required"),

  city: Yup.string().required("City is required"),

  streetAddress: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(100, "Address cannot exceed 100 characters")
    .required("Address is required"),

  zipCode: Yup.string()
    .matches(/^[0-9]+$/, "Only digits are allowed")
    .min(4, "Invalid zip code")
    .max(10, "Invalid zip code")
    .required("Zip code is required"),

  description: Yup.string()
    .min(10, "At least 10 characters")
    .max(500, "Maximum 500 characters allowed")
    .required("Description is required"),
});
