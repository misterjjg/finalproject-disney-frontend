import "./App.css";
import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import MenuModal from "../MenuModal/ModalMenu";
import SavedNews from "../SavedNews/SavedNews";
import SuccessModal from "../SuccessModal/SuccessModal";
import SearchResults from "../SearchResults/SearchResults";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  deleteCard,
  getCards,
  saveCard,
  searchCards,
} from "../../utils/NewsApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const history = useHistory("");

  // ----------------Modal Handles---------------------------

  const [modals, setModals] = useState({
    signin: false,
    signup: false,
    success: false,
    menu: false,
  });
  const openModal = (modal) => {
    setModals((prevModals) => ({ ...prevModals, [modal]: true }));
  };
  const closeAllModals = () => {
    setModals({ signin: false, signup: false, success: false, menu: false });
  };

  const openMenuModal = () => {
    closeAllModals();
    openModal("menu");
  };

  const openSignInModal = () => {
    closeAllModals();
    openModal("signin");
  };

  const openSignUpModal = () => {
    closeAllModals();
    openModal("signup");
  };

  const openSuccessModal = () => {
    closeAllModals();
    openModal("success");
  };

  const handleLoading = () => {
    setIsLoading((state) => !state);
  };

  // ----------------Logout---------------------------

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/");
  };

  // ----------------Api Functions---------------------------

  const [cardsData, setCardsData] = useState([]);

  const handleSearchResults = ({
    userInput,
    apiKey,
    fromDate,
    toDate,
    pageSize,
  }) => {
    handleLoading();
    searchCards({ userInput, apiKey, fromDate, toDate, pageSize })
      .then((res) => {
        setIsLoading(false);
        setSearchFocus(true);
        setCardsData(res.articles);
      })
      .catch((err) => {
        console.error(err.message, "cant get cards!");
      });
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchKeyword = (value) => {
    setSearchKeyword(value);
  };

  // ----------------Validations---------------------------

  const [loginValidation, setLoginValidation] = useState("");

  function handleLogin({ email, password }) {
    handleLoading();
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          console.log("handleLogin function:", res);
          localStorage.setItem("jwt", res.token);
          setLoginValidation("");
          auth
            .checkToken(res.token)
            .then((data) => {
              console.log("handleLogin function:", data);
              setCurrentUser(data.data);
              setLoggedIn(true);
            })
            .catch((err) => {
              console.error(err);
              console.log("Token failure: ", err);
            });
        }
        closeAllModals();
      })
      .catch((err) => {
        console.log("Login failed: ", err);
        setLoginValidation("Login failed!");
      })
      .finally(handleLoading);
  }

  const [signupValidation, setSignupValidation] = useState("");

  function handleRegistration({ email, password, name }) {
    handleLoading();
    auth
      .register(email, password, name)
      .then((res) => {
        console.log("handleRegistration function: ", res);
        setSignupValidation("");
      })
      .catch((err) => {
        console.log("Registration failed: ", err);
        setSignupValidation("This email is not available");
      })
      .finally(handleLoading);
  }

  // ----------------Card Functions---------------------------

  const [savedCards, setSavedCards] = useState([]);
  const linksArray = savedCards.map((card) => ({
    id: card._id,
    link: card.link,
  }));
  const handleSavingCard = (token, cardData) => {
    console.log(token);
    saveCard(token, cardData)
      .then((res) => {
        const savedCard = {
          keyword: res.date.keyword,
          title: res.date.title,
          text: res.date.text,
          date: res.date.date,
          source: res.date.source,
          author: res.date.author,
          image: res.date.image,
          link: res.date.link,
          artileId: res.date._id,
          owner: currentUser._id,
        };
        setSavedCards((prevSavedCards) => [...prevSavedCards, savedCard]);
        getCards(token).then((res) => {
          setSavedCards(res.data);
        });
      })
      .catch((err) => console.error(err, "didnt save card"));
  };

  const handleDeletingCard = (id, token, link) => {
    handleLoading();
    deleteCard(id, token)
      .then(() => {
        setSavedCards((prevCards) => prevCards.filter((x) => link !== x.link));
      })
      .catch((err) => console.error(err))
      .finally(handleLoading);
  };

  // ----------------Use Effects---------------------------

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [modals]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res.data);
          setLoggedIn(true);
          getCards(jwt).then((res) => {
            setSavedCards(res.data);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <div
              className={
                location.pathname === "/saved-articles"
                  ? "app__saved"
                  : "app__home"
              }
            >
              <Header
                onCreateSignIn={openSignInModal}
                onCreateMenu={openMenuModal}
                loggedIn={loggedIn}
                windowWidth={windowWidth}
                setLoggedIn={setLoggedIn}
                logout={logout}
              />
              <Main
                windowWidth={windowWidth}
                onSearch={handleSearchResults}
                onSearchKeyword={handleSearchKeyword}
              />
            </div>
            <div className={isLoading ? "preloader" : "preloader-hidden"}>
              <Preloader />
            </div>
            <div
              className={
                cardsData.length === 0 && searchFocus === true
                  ? "app__nothing"
                  : "app__nothing_hidden"
              }
            >
              <NothingFound />
            </div>
            <div
              className={
                cardsData.length > 0 ? "app__cards" : "app__cards_hidden"
              }
            >
              <SearchResults
                cardsData={cardsData}
                onLikeCard={handleSavingCard}
                loggedIn={loggedIn}
                searchKeyword={searchKeyword}
                onCreateSignUp={openSignUpModal}
                linksArray={linksArray}
                onDeleteCard={handleDeletingCard}
              />
            </div>
            <About />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/saved-articles"
            loggedIn={loggedIn}
            onCreateSignUp={openSignUpModal}
            buttonText="Sign in"
            onClose={() => closeAllModals()}
            isOpen={true}
            setModals={setModals}
            onSubmit={handleLogin}
            loginValidation={loginValidation}
            setLoginValidation={setLoginValidation}
            setLoggedIn={setLoggedIn}
            component={(props) => (
              <SavedNews
                {...props}
                loggedIn={loggedIn}
                windowWidth={windowWidth}
                onCreateMenu={openMenuModal}
                savedCards={savedCards}
                logout={logout}
                searchKeyword={searchKeyword}
                onDeleteCard={handleDeletingCard}
                linksArray={linksArray}
              />
            )}
          />
        </Switch>
        {modals.signin && (
          <SignInModal
            onCreateSignUp={openSignUpModal}
            buttonText="Sign in"
            onClose={() => closeAllModals()}
            isOpen={modals.signin === true}
            setModals={setModals}
            onSubmit={handleLogin}
            loginValidation={loginValidation}
            setLoginValidation={setLoginValidation}
            setLoggedIn={setLoggedIn}
          />
        )}
        {modals.signup && (
          <SignUpModal
            onCreateSignIn={openSignInModal}
            onCreateSuccess={openSuccessModal}
            buttonText="Sign up"
            onClose={() => closeAllModals()}
            isOpen={modals.signup === true}
            setModals={setModals}
            onSubmit={handleRegistration}
            signupValidation={signupValidation}
            setSignupValidation={setSignupValidation}
          />
        )}
        {modals.success && (
          <SuccessModal
            onCreateSuccess={openSuccessModal}
            onClose={() => closeAllModals()}
            isOpen={modals.success === true}
            setModals={setModals}
            onCreateSignIn={openSignInModal}
          />
        )}
        {modals.menu && (
          <MenuModal
            onCreateMenu={openMenuModal}
            onCreateSignIn={openSignInModal}
            onClose={() => closeAllModals()}
            isOpen={modals.menu === true}
            setModals={setModals}
            loggedIn={loggedIn}
            logout={logout}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
