import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
    description: "",
    genre: "",
    facebookUrl: "",
    instagramTag: "",
    twitterTag: "",
    websiteUrl: "",
    capacity: "",
    members: null,
    dates: null,
    password: "",
    passwordConfirm: "",
  });

  const getValues = (e, field, dates) => {
    if (field.startsWith("address")) {
      const splitField = field.split(".");
      setFormData((prev) => {
        return {
          ...prev,
          address: { ...prev.address, [splitField[1]]: e.target.value },
        };
      });
    } else if (field.startsWith("dates")) {
      setFormData((prev) => {
        return { ...prev, [field]: dates };
      });
    } else {
      setFormData((prev) => {
        return { ...prev, [field]: e.target.value };
      });
    }
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, getValues }}>
      {children}
    </FormContext.Provider>
  );
};
