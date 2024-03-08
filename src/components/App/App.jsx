import "./App.css";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ModalWithMenu from "../ModalWithMenu/ModalWithMenu";
import Home from "../../pages/Home";
import SavedNewsPage from "../../pages/SavedNewsPage";
import { getItems } from "../../utils/Api";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [searchValue, setSearchValue] = useState(() => {
    if (localStorage.getItem("search")) {
      return localStorage.getItem("search");
    }
    return "";
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedCardsState, setSavedCardsState] = useState([]);

  const [localStorageCards, setLocalStorageCards] = useState(() => {
    if (localStorage.getItem("data")) {
      return JSON.parse(localStorage.getItem("data"));
    }
    return [];
  });

  const [showNewsCard, setShowNewsCard] = useState(
    () => localStorageCards.length
  );

  const [dataError, setDataError] = useState("");

  const onSignIn = ({ email, password }) => {
    setCurrentUser({ email, password });
    onClose();
  };

  const onSignOut = () => {
    setCurrentUser({});
    onClose();
  };

  const deleteFromSavedCards = (props) => {
    let newCards;
    newCards = savedCardsState.filter(
      (item) => item?.props.title !== props.title
    );
    setSavedCardsState(newCards);
  };

  const addToSavedCards = (props) => {
    let searchValuetoUpper =
      searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
    setSavedCardsState((prevState) => [
      ...prevState,
      { props, keyword: searchValuetoUpper },
    ]);
  };

  const checkSaveStatus = (props) => {
    const check = savedCardsState?.some(
      (item) => props?.title === item?.props?.title
    );
    check ? deleteFromSavedCards(props) : addToSavedCards(props);
  };

  const onSearch = (value) => {
    setShowNewsCard(true);
    setLoading(true);
    setSearchValue(value);
    localStorage.setItem("search", value);
  };

  const onLoginModal = () => {
    setActiveModal("loginModal");
  };

  const onRegisterModal = () => {
    setActiveModal("registerModal");
  };

  const onMenuModal = () => {
    setActiveModal("menuModal");
  };

  const onClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (e.target.className === "modal") onClose();
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [activeModal]);

  useEffect(() => {
    loading ? (
      getItems(searchValue)
        .then((res) => {
          setData(res);
          localStorage.setItem("data", JSON.stringify(res));
          setLocalStorageCards(JSON.parse(localStorage.getItem("data")));
        })
        .catch((err) => {
          console.error(err);
          setDataError(err);
        })
    ) : (
      <></>
    );
  }, [loading, searchValue]);
  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <main className="app">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <SavedCardsContext.Provider value={{ savedCardsState }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  onLoginModal={onLoginModal}
                  onRegisterModal={onRegisterModal}
                  onClose={onClose}
                  onSearch={onSearch}
                  onSignOut={onSignOut}
                  onMenuModal={onMenuModal}
                  cards={localStorageCards}
                  error={dataError}
                  checkSaveStatus={checkSaveStatus}
                  showNewsCard={showNewsCard}
                  loading={loading}
                />
              )}
            />

            <Route
              path="/savednews"
              render={() => (
                <SavedNewsPage
                  onLoginModal={onLoginModal}
                  onRegisterModal={onRegisterModal}
                  onClose={onClose}
                  onMenuModal={onMenuModal}
                  showNewsCard={showNewsCard}
                  cards={savedCardsState}
                  error={dataError}
                  checkSaveStatus={checkSaveStatus}
                  loading={loading}
                />
              )}
            />
          </Switch>
          {activeModal === "loginModal" && (
            <LoginModal
              onLoginModal={onLoginModal}
              onClose={onClose}
              onSignIn={onSignIn}
            ></LoginModal>
          )}
          {activeModal === "registerModal" && (
            <RegisterModal
              onRegisterModal={onRegisterModal}
              onClose={onClose}
            ></RegisterModal>
          )}
          {activeModal === "menuModal" && (
            <ModalWithMenu
              onMenuModal={onMenuModal}
              onClose={onClose}
              onLoginModal={onLoginModal}
              onSignOut={onSignOut}
            ></ModalWithMenu>
          )}
        </SavedCardsContext.Provider>
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;
