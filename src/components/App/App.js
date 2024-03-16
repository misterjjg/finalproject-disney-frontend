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

  // function handleSignup() {
  //   // if(!existingUser) {
  //   //  setCurrentUser()
  //   // }
  // }

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
