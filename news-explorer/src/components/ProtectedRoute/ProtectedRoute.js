import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Route {...rest}>
      {currentUser?.name || localStorage.getItem("jwt")?.length > 0
        ? children
        : (rest.onLogin(), (<Redirect to="/" />))}
    </Route>
  );
};

export default ProtectedRoute;
