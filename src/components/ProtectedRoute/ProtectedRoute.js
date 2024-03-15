import { useContext } from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children, ...props }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to="/" />}</Route>
  );
}

export default ProtectedRoute;
