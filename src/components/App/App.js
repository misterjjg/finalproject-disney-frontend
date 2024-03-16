import "./App.css";

// react
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// components
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import SigninModal from "../SigninModal/SigninModal";
import SignupModal from "../SignupModal/SignupModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { ESC_KEYCODE } from "../../utils/constants";

// contexts
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentPageContext from "../../contexts/CurrentPageContext";
import SearchResultContext from "../../contexts/SearchResultsContext";
import HasSearchedContext from "../../contexts/HasSearchedContext";
import NewsSearchContext from "../../contexts/NewsSearchContext";
import IsLoadingContext from "../../contexts/IsLoadingContext";
import SavedCardsContext from "../../contexts/SavedCardsContext";
import MobileContext from "../../contexts/MobileContext";

// API
import { getNews } from "../../utils/NewsApi";
import MobileMenu from "../MobileMenu/MobileMenu";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("/");
  // const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveCards, setSavedCards] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleOpenModal = (modal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleAltClick = () => {
    if (activeModal === "signin") {
      handleCloseModal();
      handleOpenModal("signup");
    }
    if (activeModal === "signup") {
      handleCloseModal();
      handleOpenModal("signin");
    }
  };

  const handleNewsSearch = (input) => {
    setIsLoading(true);
    const searchNews = getNews(input);
    searchNews.then((data) => {
      setHasSearched(true);
      setSearchResults(data.articles);
      setIsLoading(false);
    });
  };

  const handleSuccessModalClick = () => {
    handleCloseModal();
    handleOpenModal("signin");
  };

  const handleSigninModal = () => handleOpenModal("signin");

  const handleSignupModal = () => handleOpenModal("signup");

  function handleSignin() {
    setLoggedIn(true);
    setCurrentUser("Josh");
    handleCloseModal();
  }

  function handleSignup() {
    // if(!existingUser) {
    //  setCurrentUser()
    // }
  }

  function handleSignout() {
    setCurrentUser("");
    setLoggedIn(false);
    setCurrentPage("/");
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileMenuOverlay = () => {
    handleSigninModal();
    closeMobileMenu();
  };

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.which === ESC_KEYCODE) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentPageContext.Provider value={{ currentPage, activeModal }}>
        <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
          <NewsSearchContext.Provider value={{ handleNewsSearch }}>
            <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
              <SearchResultContext.Provider value={{ searchResults }}>
                <HasSearchedContext.Provider
                  value={{ hasSearched, setHasSearched }}
                >
                  <SavedCardsContext.Provider
                    value={{ saveCards, setSavedCards }}
                  >
                    <MobileContext.Provider
                      value={{
                        mobileMenuOpen,
                        openMobileMenu,
                      }}
                    >
                      <Route exact path="/">
                        <Main
                          signinClick={handleSigninModal}
                          signoutClick={handleSignout}
                        />
                      </Route>
                      <ProtectedRoute path="/saved-news">
                        <SavedNews />
                      </ProtectedRoute>
                      <Footer />
                      {activeModal === "signin" && (
                        <SigninModal
                          isOpen={handleSigninModal}
                          onSignin={handleSignin}
                          handleClose={handleCloseModal}
                          onAltClick={handleAltClick}
                        />
                      )}
                      {activeModal === "signup" && (
                        <SignupModal
                          isOpen={handleSignupModal}
                          onSignup={handleSignup}
                          handleClose={handleCloseModal}
                          onAltClick={handleAltClick}
                        />
                      )}
                      {activeModal === "success" && (
                        <SuccessModal
                          name="success"
                          onClose={handleCloseModal}
                          onClick={handleSuccessModalClick}
                        />
                      )}
                      {mobileMenuOpen && (
                        <MobileMenu
                          onClose={closeMobileMenu}
                          onSigninClick={handleMobileMenuOverlay}
                          onSignoutClick={handleSignout}
                        />
                      )}
                    </MobileContext.Provider>
                  </SavedCardsContext.Provider>
                </HasSearchedContext.Provider>
              </SearchResultContext.Provider>
            </IsLoadingContext.Provider>
          </NewsSearchContext.Provider>
        </CurrentUserContext.Provider>
      </CurrentPageContext.Provider>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignupModal({ isOpen, onSignup, handleClose, onAltClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onSignup({ email, password, username });
  }

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      onSubmit={handleSubmit}
      handleAltClick={onAltClick}
      onClose={handleClose}
      buttonText="Sign up"
      altButtonText="Sign in"
    >
      <label>
        <h3 className="modal__label">Email:</h3>
        <input
          className="modal__input"
          id="email-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <span className="modal__error" id="email-input-error"></span>
      <label>
        <h3 className="modal__label">Password:</h3>
        <input
          className="modal__input"
          id="password-input"
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <span className="modal__error" id="password-input-error"></span>
      <label>
        <h3 className="modal__label">Username:</h3>
        <input
          className="modal__input"
          id="username-input"
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </label>
      <span className="modal__error" id="username-input-error"></span>
    </ModalWithForm>
  );
}

export default SignupModal;
import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SigninModal({ isOpen, onSignin, handleClose, onAltClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (email === "" || password === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignin({ email, password });
  };

  return (
    <ModalWithForm
      title="Sign In"
      onSubmit={handleSubmit}
      onClose={handleClose}
      handleAltClick={onAltClick}
      buttonText="Sign in"
      altButtonText="Sign up"
      isDisabled={isDisabled}
    >
      <label>
        <h3 className="modal__label">Email:</h3>
        <input
          className="modal__input"
          id="email-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <span className="modal__error" id="email-input-error"></span>
      <label>
        <h3 className="modal__label">Password:</h3>
        <input
          className="modal__input"
          id="password-input"
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <span className="modal__error" id="password-input-error"></span>
    </ModalWithForm>
  );
}

export default SigninModal;