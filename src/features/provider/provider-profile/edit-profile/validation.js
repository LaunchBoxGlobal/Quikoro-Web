import * as Yup from "yup";

export const editProfileSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  speciality: Yup.string().required("Speciality required"),

  dateOfBirth: Yup.string().required("Date of birth required"),

  country: Yup.string().required("Country required"),

  state: Yup.string().required("State required"),

  city: Yup.string().required("City required"),

  gender: Yup.string().required("Gender required"),

  zipCode: Yup.string().required("Zip code required"),

  streetAddress: Yup.string().required("Address required"),

  yearsOfExperience: Yup.number().min(0).required("Experience required"),

  description: Yup.string().required("Description required"),

  profilePicture: null,
});
