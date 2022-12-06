export const signupOnSubmit = async (values, actions, userType) => {
  try {
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
      location: { coordinates: [12.75597, 51.372651] },
    };
    console.log(newValues);
    // Sending POST request to backend
    const req = await fetch(`/${userType}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    });
    const res = await req.json();
    // Throw error when failed
    if (res.status === "fail") {
      const error = new Error(res.message);
      error.code = res.code;
      throw error;
    }
    actions.resetForm();
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      const [name, message] = err.message.split(":");
      actions.setFieldError(name, message);
    }
  }
};
