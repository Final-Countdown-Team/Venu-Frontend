import * as yup from "yup";

// Minimum eight characters, at least one letter, one number and one special character:
// const passwordRules =
// /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const coreSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name needs to have min. 2 characters")
    .max(50, "Your name cannot exceed 50 characters")
    .required("This field is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("This field is required"),

  address: yup.object().shape({
    street: yup.string().required("This field is required"),
    city: yup.string().required("This field is required"),
    zipcode: yup.string().required("This field is required"),
  }),
  description: yup.string(),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    // .matches(passwordRules, {
    //   message:
    //     "Password must contain 1 letter, 1 number, 1 special character",
    // })
    .required("This field is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("This field is required"),
});

const mediaLinks = {
  facebookUrl: yup.string().url("Please enter a valid URL"),
  instagramTag: yup
    .string()
    .matches(/^@/, "Your instagram tag must start with an @"),
  twitterTag: yup.string().matches(/^@/, "Your twitter tag must start with an @"),
};

const venueSchema = yup.object().shape({
  capacity: yup
    .number()
    .typeError("Please insert a valid number")
    .min(1)
    .max(1000000),
  mediaLinks: yup.object().shape({
    ...mediaLinks,
    websiteUrl: yup.string().url("Please enter a valid URL"),
  }),
});

const artistSchema = yup.object().shape({
  genre: yup.string(),
  members: yup.number().typeError("Please insert a valid number").min(1).max(1000),
  mediaLinks: yup.object().shape({
    ...mediaLinks,
    youtubeUrl: yup.string().url("Please enter a valid URL"),
  }),
});

const changePasswordSchema = yup.object().shape({
  passwordCurrent: yup.string().required("This field is required"),
});

// Helper function that concats the coreSchema with the schema for each userType
export const schemaBuilder = (purpose, userType) => {
  const type = userType === "venues" ? venueSchema : artistSchema;

  if (purpose === "edit") {
    return coreSchema.concat(type);
  }
  if (purpose === "signup") {
    return coreSchema.concat(passwordSchema).concat(type);
  }
  if (purpose === "changePassword") {
    return passwordSchema.concat(changePasswordSchema);
  }
  return;
};

export const signupInitialValues = {
  name: "",
  email: "",
  address: {
    street: "",
    city: "",
    zipcode: "",
  },
  description: "",
  // genre: "",
  mediaLinks: {
    facebookUrl: "",
    instagramTag: "",
    twitterTag: "",
    // youtubeUrl: "",
    websiteUrl: "",
  },
  capacity: "",
  // members: "",
  dates: "",
  password: "",
  passwordConfirm: "",
};
