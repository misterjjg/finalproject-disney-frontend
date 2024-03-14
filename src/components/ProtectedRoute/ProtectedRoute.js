import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import SignInModal from "../SignInModal/SignInModal";

const ProtectedRoute = ({ component: Component, ...props }) => {
  useEffect(() => {
    if (!props.loggedIn) {
      props.setModals((prevModals) => ({ ...prevModals, signin: true }));
    }
  }, [props.loggedIn]);
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to="/" />
            <SignInModal
              onCreateSignUp={props.onCreateSignUp}
              buttonText={props.buttonText}
              onClose={props.onClose}
              isOpen={props.isOpen}
              setModals={props.setModals}
              onSubmit={props.onSubmit}
              loginValidation={props.loginValidation}
              setLoginValidation={props.setLoginValidation}
              setLoggedIn={props.setLoggedIn}
            />
          </>
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
