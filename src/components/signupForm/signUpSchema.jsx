import * as yup from "yup";

// Minimum eight characters, at least one letter, one number and one special character:
// const passwordRules =
// /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Your name needs to have min. 2 characters")
    .max(50, "Your name cannot exceed 50 characters")
    .required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Required"),

  address: yup.object().shape({
    street: yup.string().required("Required"),
    city: yup.string().required("Required"),
    zipcode: yup.string().required("Required"),
  }),
  facebookUrl: yup.string().url("Please enter a valid URL"),
  instagramTag: yup
    .string()
    .matches(/^@/, "Your instagram tag must start with an @"),
  twitterTag: yup
    .string()
    .matches(/^@/, "Your twitter tag must start with an @"),
  websiteUrl: yup.string().url("Please enter a valid URL"),
  capacity: yup.number("Please insert a valid number").min(1).max(1000000),
  members: yup.number("Please insert a valid number").min(1).max(1000),

  password: yup
    .string()
    .min(8)
    // .matches(passwordRules, {
    //   message:
    //     "Password must contain 1 letter, 1 number, 1 special character",
    // })
    .required("Required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});
