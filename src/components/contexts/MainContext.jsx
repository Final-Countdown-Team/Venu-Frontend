import { useEffect, useReducer } from "react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { mainContextReducer } from "./MainContextReducer";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // Show the hamburger menu
  const [showSidebar, setShowSidebar] = useState(false);
  // Conditionally disabled form inputs
  const [isDisabled, setIsDisabled] = useState(true);

  // REDUCER
  const initalState = {
    globalUserType: {},
    previews: [],
    mapLocations: [],
    watchUser: {},
    loggedInUser: {},
    isLoggedIn: false,
    // Pending is for button or loading animations during fetch
    isPending: false,
    // Loading === false tells components to safely start mounting when the data arrived
    isLoading: true,
    fetchFromLocalStorage: true,
  };

  const [state, dispatch] = useReducer(mainContextReducer, initalState);
  // console.log(state);

  // Check if a user is still stored in localStorage and set isLoggedInUser
  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      // console.log("Is fetching from local storage...");
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      dispatch({
        type: "GET_LOGGED_IN_USER",
        payload: user,
      });
    }
    setFetchFromLocalStorage(false);
    return;
  }, []);

  // Persist the loggedInUser to localStorage
  useEffect(() => {
    if (state.loggedInUser && Object.keys(state.loggedInUser).length === 0) return;
    localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
  }, [state.loggedInUser]);

  // Set pending helper function
  const setIsPending = (boolean) =>
    dispatch({ type: "SET_IS_PENDING", payload: boolean });

  // Set loading helper functions
  const setIsLoading = (boolean) =>
    dispatch({ type: "SET_IS_LOADING", payload: boolean });

  const setFetchFromLocalStorage = (boolean) => {
    dispatch({ type: "SET_FETCH_FROM_LOCAL_STORAGE", payload: boolean });
  };

  // Set a globalUserType
  const setGlobalUserType = (userType) => {
    dispatch({
      type: "SET_GLOBAL_USERTYPE",
      payload: userType,
    });
  };

  // Delete outdated dates, is called when user is logged in
  // const updateDates = async (response, userType) => {
  //   try {
  //     const updatedDates = response.data.dates.filter((date) => {
  //       const today = new Date().toISOString();
  //       return date > today;
  //     });

  //     const req = await fetch(`/${userType}/user/updateMe`, {
  //       method: "PATCH",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ dates: updatedDates }),
  //     });
  //     const res = await req.json();
  //     dispatch({
  //       type: "GET_LOGGED_IN_USER",
  //       payload: res.data,
  //     });
  //     console.log("Updated dates 👍");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // Get logged in user
  const getLoggedInUser = async (values, actions, userType, navigate) => {
    try {
      setIsPending(true);

      const req = await fetch(`${BACKEND}/${userType}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const res = await req.json();
      console.log(res);
      // Throw manual error if request fails
      if (res.status === "fail" || res.status === "error")
        throw new Error(res.message || "Ups, something went wrong");
      dispatch({
        type: "GET_LOGGED_IN_USER",
        payload: res.data,
      });
      // updateDates(res, userType);
      localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
      // Show success notification when data is sucessfully fetched
      toast.success("Successfully logged in 🎉");
      actions.resetForm();
      // Redirect to home
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setIsPending(false);
      console.error(err);
      toast.error("Ups, something went wrong");
      actions.setErrors({ email: err.message, password: err.message });
    }
  };

  // Updating loggedInUser data when visiting profileMe Page
  const getMe = async () => {
    try {
      setIsPending(true);
      setIsLoading(true);
      const req = await fetch(`/${BACKEND}/${state.loggedInUser.type}/user/me`);
      const res = await req.json();
      if (res.status === "fail" || res.status === "error")
        throw new Error(res.message || "Ups, something went wrong");
      dispatch({
        type: "GET_LOGGED_IN_USER",
        payload: res.data,
      });
      localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
      setIsLoading(false);
    } catch (err) {
      setIsPending(false);
      console.error(err);
    }
  };

  // Visiting other user's profiles
  const getWatchUser = async (userID, userType, signal) => {
    try {
      setIsPending(true);
      setIsLoading(true);
      const res = await fetch(`${BACKEND}/${userType}/${userID}`, { signal });
      const data = await res.json();
      // console.log(data);
      dispatch({
        type: "GET_WATCH_USER",
        payload: data.data,
      });
    } catch (err) {
      setIsPending(false);
      console.error(err);
      toast.error("Ups, something went wrong ☹️");
    }
  };

  // Get the previews on the overview page
  const getPreviews = async (userType, signal) => {
    setIsLoading(true);
    const URL = `${BACKEND}/${userType}?fields=name,description,profileImage,availability,dates,bookedDates`;
    const res = await fetch(URL, { signal });
    const data = await res.json();
    dispatch({
      type: "GET_PREVIEWS",
      payload: data,
    });
  };

  // Get locations of 10 users of each userType for the map on Home
  const getLocations = async () => {
    setIsLoading(true);
    setIsPending(true);
    const query = "fields=name,location,type&page=1&limit=10";
    const artistsRes = await fetch(`${BACKEND}/artists?${query}`);
    const artistsData = await artistsRes.json();

    const venuesRes = await fetch(`${BACKEND}/venues?${query}`);
    const venuesData = await venuesRes.json();

    const joinedData = artistsData.data.concat(venuesData.data);

    dispatch({
      type: "GET_LOCATIONS",
      payload: joinedData,
    });
  };

  // Searchbar results
  const getSearchResults = (data) => {
    dispatch({
      type: "GET_PREVIEWS",
      payload: data,
    });
  };

  // Updating helper for form submission
  const updateAfterSubmit = (res, message) => {
    dispatch({
      type: "GET_LOGGED_IN_USER",
      payload: res.data,
    });
    message && toast.success(message);
    // Save user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
  };

  // submitHandler for edit form, handles file uploads
  const editFormSubmitImages = async (imageFiles) => {
    try {
      if (!imageFiles.profileImage && !imageFiles.images) return;
      setIsPending(true);
      // --- SENDING IMAGES ---
      // Creating new FormData to be able to send files to backend
      const formData = new FormData();
      // Overwriting the profileImage property with the imageFile
      if (imageFiles.profileImage) {
        formData.set(
          "profileImage",
          imageFiles.profileImage,
          imageFiles.profileImage.name
        );
      }
      if (imageFiles.images || imageFiles.images.every((img) => img === "")) {
        imageFiles.images.forEach((image, i) => {
          // If the user didn't delete the image form database
          if (typeof image === "string" && image.includes("http")) return;
          // If the user deleted the image
          if (typeof image === "string" && image.includes("empty")) {
            const emptyBlob = new Blob(["Delete me"], {
              type: "image/jpeg",
            });
            return formData.append("images", emptyBlob, `delete-me-at-${i}`);
          }
          // New image file uploaded
          return formData.append("images", image, `replace-at-${i}`);
        });
      }
      console.log(formData);
      // Sending images in formData
      const URL = `${BACKEND}}/${state.loggedInUser.type}/user/updateMe`;
      const req = await fetch(URL, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const res = await req.json();
      // // Throw error when failed
      if (res.status === "fail" || res.status === "error") {
        const error = res;
        throw error;
      }
      console.log(res);
      updateAfterSubmit(res);
      // setTimeout(() => navigate("/me"), 1000);
    } catch (err) {
      setIsPending(false);
      console.error(err.message);
      toast.error("Ups, something went wrong 💥");
    }
  };

  // submitHandler for edit form, regular data
  const editFormSubmitData = async (values, actions) => {
    try {
      setIsPending(true);
      // Filtering out keys with empty values
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      // Get coordinates based on address
      const geoCodeValues = await geoCodeAddress(filteredValues);
      console.log(geoCodeValues);

      const URL = `${BACKEND}/${state.loggedInUser.type}/user/updateMe`;
      // // Sending regular form data
      const req = await fetch(URL, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geoCodeValues),
      });
      const res = await req.json();
      // // Throw error when failed
      if (req.status === "fail" || req.status === "error") {
        const error = req;
        throw error;
      }
      updateAfterSubmit(res);
    } catch (err) {
      setIsPending(false);
      console.error(err.message);
      toast.error("Ups, something went wrong 💥");
      // Code 11000 is duplicate key error (email already taken)
      if (err.code === 11000) {
        const [name, message] = err.message.split(":");
        return actions.setFieldError(name, message);
      }
    }
  };

  // Signup submit handler
  const formSubmitSignup = async (values, actions, userType, navigate) => {
    try {
      setIsPending(true);
      // Filtering out keys with empty values
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      console.log(filteredValues);
      const geoCodeValues = await geoCodeAddress(filteredValues);
      console.log(geoCodeValues);
      // Sending POST request to backend
      if (geoCodeValues) {
        const req = await fetch(`${BACKEND}/${userType}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(geoCodeValues),
        });
        const res = await req.json();
        console.log(res);
        // Throw error when failed
        if (res.status === "fail" || res.status === "error") {
          const error = res;
          throw error;
        }
        // Updating loggedInUser state + toast
        updateAfterSubmit(res, "Successfully signed up 🎉");
        // Redirect to home
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error("Couldn't send request");
      }
    } catch (err) {
      setIsPending(false);
      console.error(err.message);
      // Code 11000 is duplicate key error (email already taken)
      if (err.error && err.error.code === 11000) {
        toast.error("This email is already taken", {
          position: "bottom-center",
        });
        actions.setFieldError("email", "This email is already taken");
        return;
      } else if (err.isOperational) {
        toast.error(err.message);
        actions.setFieldError("address", "Please check your address");
      } else {
        toast.error("Sorry, something went wrong 💥", {
          position: "bottom-center",
        });
      }
    }
  };

  // Geocode helper function the coordinates from address
  const geoCodeAddress = async (values) => {
    // Guard clause when there is no address property on values
    if (!values.address) return values;
    const { street, city, zipcode } = values.address;
    // Fetching address data from geoApify
    const geoRes = await fetch(
      `https://api.geoapify.com/v1/geocode/search?street=${street}&postcode=${zipcode}&city=${city}&format=json&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
    );
    console.log(geoRes);
    const geoData = await geoRes.json();

    if (!geoRes.ok || !geoData.results.length) {
      const error = new Error(
        "Something went wrong validating your address. Please check if you entered a valid address."
      );
      error.isOperational = true;
      throw error;
    }
    // Destructuring coordinates
    const [{ lat, lon }] = geoData.results;
    console.log(lat, lon);

    const newValues = {
      ...values,
      location: { type: "Point", coordinates: [lon, lat] },
    };
    return newValues;
  };

  // Logout
  const logoutUser = async (navigate, message) => {
    await fetch(`${BACKEND}/${state.loggedInUser.type}/logout`);
    dispatch({
      type: "CLEAR_LOGGED_IN_USER",
    });
    toast.success(message);
    localStorage.clear();
    navigate("/");
  };

  // DeleteAccount
  const deleteAccount = async (setShowConfirm, navigate) => {
    try {
      setShowConfirm(false);
      await fetch(`${BACKEND}/${state.loggedInUser.type}/user/deleteMe`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetch(`${BACKEND}/${state.loggedInUser.type}/logout`);
      logoutUser(navigate, "Your account was deleted");
    } catch (err) {
      console.error(err);
    }
  };

  // Deactiavte Account
  const reactivateAccount = async (userType, id) => {
    try {
      setIsLoading(true);
      await fetch(`${BACKEND}/${userType}/reactivateAccount/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Your account has been reactivated 🎉 \n Please login as usual");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Sorry, something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <MainContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        isDisabled,
        setIsDisabled,
        setGlobalUserType,
        getSearchResults,
        formSubmitSignup,
        editFormSubmitData,
        editFormSubmitImages,
        fetchFromLocalStorage: state.fetchFromLocalStorage,
        globalUserType: state.globalUserType,
        getPreviews,
        previews: state.previews,
        getLocations,
        mapLocations: state.mapLocations,
        getLoggedInUser,
        loggedInUser: state.loggedInUser,
        isLoggedIn: state.isLoggedIn,
        getMe,
        getWatchUser,
        watchUser: state.watchUser,
        isPending: state.isPending,
        setIsLoading,
        isLoading: state.isLoading,
        logoutUser,
        deleteAccount,
        reactivateAccount,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
