export const mainContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_USERTYPE":
      return {
        ...state,
        globalUserType: action.payload,
      };

    case "GET_PREVIEWS":
      return {
        ...state,
        previews: action.payload,
        isPending: false,
        isLoading: false,
      };
    case "GET_LOCATIONS":
      return {
        ...state,
        mapLocations: action.payload,
        isPending: false,
        isLoading: false,
      };
    case "GET_WATCH_USER":
      return {
        ...state,
        watchUser: action.payload,
        isPending: false,
        isLoading: false,
      };
    case "GET_LOGGED_IN_USER":
      return {
        ...state,
        loggedInUser: action.payload,
        isPending: false,
        isLoggedIn: true,
        fetchFromLocalStorage: false,
      };
    // Pending is for the fetch requests
    case "SET_IS_PENDING":
      return {
        ...state,
        isPending: action.payload,
      };
    // Pending is for the fetch requests
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_FETCH_FROM_LOCAL_STORAGE": {
      return {
        ...state,
        fetchFromLocalStorage: action.payload,
      };
    }
    case "CLEAR_LOGGED_IN_USER":
      return {
        ...state,
        loggedInUser: {},
        isPending: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
