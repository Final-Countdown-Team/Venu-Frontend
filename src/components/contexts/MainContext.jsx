import { useEffect, useReducer } from "react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { mainContextReducer } from "./MainContextReducer";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // Navbar
  const [showSidebar, setShowSidebar] = useState(false);
  // Form Inputs
  const [isDisabled, setIsDisabled] = useState(true);
  // Fetched venues or artists previews overview
  const [fetchedPreviews, setFetchedPreviews] = useState({});

  // Sets current global userType
  // const [globalUserType, setGlobalUserType] = useState(null);

  // Use custom hook to get or set information about login state from localStorage
  // const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  // console.log(isLoggedIn);

  // REDUCER
  const initalState = {
    globalUserType: {},
    previews: {},
    watchUser: {},
    loggedInUser: {},
    isLoggedIn: false,
    // Pending is for button or loading animations during fetch
    isPending: false,
    // Loading tells components to start mounting when the data arrived
    isLoading: true,
  };

  const [state, dispatch] = useReducer(mainContextReducer, initalState);
  console.log(state);

  // Check if a user is still stored in localStorage and set isLoggedInUser
  useEffect(() => {
    console.log("Is fetching from local storage...");
    if (localStorage.getItem("loggedInUser")) {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      dispatch({
        type: "GET_LOGGED_IN_USER",
        payload: user,
      });
    }
    return;
  }, []);

  // // Persist the loggedInUser to localStorage
  useEffect(() => {
    if (Object.keys(state.loggedInUser).length === 0) return;
    localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
  }, [state.loggedInUser]);

  // Set pending helper function
  const setIsPending = (boolean) =>
    dispatch({ type: "SET_IS_PENDING", payload: boolean });

  // Set loading helper functions
  const setIsLoading = (boolean) =>
    dispatch({ type: "SET_IS_LOADING", payload: boolean });

  // Set a globalUserType
  const setGlobalUserType = (userType) => {
    dispatch({
      type: "SET_GLOBAL_USERTYPE",
      payload: userType,
    });
  };

  // Get logged in user
  const getLoggedInUser = async (values, actions, userType, navigate) => {
    try {
      console.log("Getting logged in user...");
      setIsPending(true);
      const req = await fetch(`/${userType}/login`, {
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

  // Visiting other user's profiles
  const getWatchUser = async (userID, userType) => {
    console.log("Visiting user profile...");
    try {
      setIsPending(true);
      const res = await fetch(`/${userType}/${userID}`);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_WATCH_USER",
        payload: res.data,
      });
    } catch (err) {
      setIsPending(false);
      console.err(err);
      toast.error("Ups, something went wrong ☹️");
    }
  };

  // Get the previews on the overview page
  const getPreviews = async (userType) => {
    console.log("Getting previews...");
    setIsLoading(true);
    const URL = `/${userType}?fields=name,description,profileImage,availability,dates`;
    const res = await fetch(URL);
    const data = await res.json();
    dispatch({
      type: "GET_PREVIEWS",
      payload: data,
    });
    setTimeout(() => setIsLoading(false), 800);
  };

  // Searchbar results
  const getSearchResults = (data) => {
    console.log("Getting search results...");
    dispatch({
      type: "GET_PREVIEWS",
      payload: data,
    });
  };

  //
  const formSubmitEditSignup = async (
    values,
    actions,
    userType,
    navigate,
    editForm
  ) => {
    try {
      console.log("Submitting form values...");
      setIsPending(true);
      // Geocode the coordinates from address
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
      const type = !userType ? state.loggedInUser.type : userType;
      const URL = `/${type}/${editForm ? "user/updateMe" : "signup"}`;
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
        const error = res;
        throw error;
      }
      const message = editForm
        ? "Your profile has been updated 🥳"
        : "Successfully signed up 🎉";
      toast.success(message);
      // actions.resetForm();

      dispatch({
        type: "GET_LOGGED_IN_USER",
        payload: res.data,
      });
      localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
      // Redirect to home
      const navPath = editForm ? "/me" : "/";
      setTimeout(() => navigate(navPath), 1000);
    } catch (err) {
      setIsPending(false);
      console.error(err.message);
      toast.error("Ups, something went wrong 💥");
      if (err.code === 11000) {
        const [name, message] = err.message.split(":");
        return actions.setFieldError(name, message);
      }
    }
  };

  // Logout
  const logoutUser = async (navigate, message) => {
    console.log(state.loggedInUser.type);
    await fetch(`/${state.loggedInUser.type}/logout`);
    dispatch({
      type: "CLEAR_LOGGED_IN_USER",
    });
    toast.success(message);
    localStorage.clear();
    navigate("/");
  };

  return (
    <MainContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        isDisabled,
        setIsDisabled,
        fetchedPreviews,
        setFetchedPreviews,
        // globalUserType,
        // setGlobalUserType,
        // isLoggedIn,
        // setIsLoggedIn,
        setGlobalUserType,
        getSearchResults,
        formSubmitEditSignup,
        globalUserType: state.globalUserType,
        getPreviews,
        previews: state.previews,
        getLoggedInUser,
        loggedInUser: state.loggedInUser,
        isLoggedIn: state.isLoggedIn,
        getWatchUser,
        watchUser: state.watchUser,
        isPending: state.isPending,
        isLoading: state.isLoading,
        logoutUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
