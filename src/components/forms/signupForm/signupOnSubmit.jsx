import { toast } from "react-hot-toast";

export const signupOnSubmit = async (
  values,
  actions,
  userType,
  setIsPending,
  setIsLoggedIn,
  navigate,
  editForm
) => {
  try {
    setIsPending(true);
    // const { street, city, zipcode } = values.address;
    // // Fetching address data from geoApify
    // const geoRes = await fetch(
    //   `https://api.geoapify.com/v1/geocode/search?street=${street}&postcode=${zipcode}&city=${city}&format=json&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
    // );

    // if (!geoRes.ok)
    //   throw new Error(
    //     "Something went wrong validating your address. Please check if you entered a valid address."
    //   );
    // const geoData = await geoRes.json();
    // // Destructuring coordinates
    // const [{ lat, lon }] = geoData.results;
    // console.log(lat, lon);

    // const newValues = {
    //   ...values,
    //   location: { coordinates: [lon, lat] },
    // };

    const newValues = {
      ...values,
      location: { type: "Point", coordinates: [12.75597, 51.372651] },
    };
    // Filtering out keys with empty values
    const filteredValues = Object.fromEntries(
      Object.entries(newValues).filter(([_, value]) => value !== "")
    );
    console.log(filteredValues);
    // Sending POST request to backend
    const URL = `/${userType}/${editForm ? "user/updateMe" : "signup"}`;
    const method = editForm ? "PATCH" : "POST";

    const req = await fetch(URL, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredValues),
    });
    const res = await req.json();
    console.log(res);
    // Throw error when failed
    if (res.status === "fail" || res.status === "error") {
      const error = new Error(res.message);
      error.code = res.code;
      throw error;
    }
    const message = editForm
      ? "Your profile has been updated 🥳"
      : "Successfully signed up 🎉";
    toast.success(message);
    setIsPending(false);
    actions.resetForm();
    // Save data to localStorage state
    if (setIsLoggedIn) {
      setIsLoggedIn({
        status: true,
        userType,
        id: res.data._id,
      });
    }
    // Redirect to home
    const navPath = editForm ? "/me" : "/";
    setTimeout(() => navigate(navPath), 1000);
  } catch (err) {
    setIsPending(false);
    console.error(err);
    toast.error("Ups, something went wrong 💥");
    if (err.code === 11000) {
      const [name, message] = err.message.split(":");
      return actions.setFieldError(name, message);
    }
    console.error(err);
  }
};
