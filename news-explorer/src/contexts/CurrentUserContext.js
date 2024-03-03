import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: {},
  setCurrentUser: () => {},
});

export default CurrentUserContext;
