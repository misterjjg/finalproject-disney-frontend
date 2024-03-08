import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import Preloader from "../components/Preloader/Preloader";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";

const Home = ({
  onLoginModal,
  onRegisterModal,
  onClose,
  onSearch,
  onSignOut,
  onMenuModal,
  showNewsCard,
  cards,
  error,
  checkSaveStatus,
  loading,
}) => {
  return (
    <div>
      <div className="header__main">
        <Header
          onLoginModal={onLoginModal}
          onRegisterModal={onRegisterModal}
          onClose={onClose}
          onMenuModal={onMenuModal}
          onSignOut={onSignOut}
          currentPage={"Home"}
        />
        <section>
          <Main
            onLoginModal={onLoginModal}
            onRegisterModal={onRegisterModal}
            onClose={onClose}
            onSearch={onSearch}
            onSignOut={onSignOut}
            onMenuModal={onMenuModal}
          />
        </section>
      </div>
      <section>
        {showNewsCard ? (
          <NewsCardList
            cards={cards}
            error={error}
            checkSaveStatus={checkSaveStatus}
          >
            {loading && <Preloader></Preloader>}
          </NewsCardList>
        ) : (
          <></>
        )}
      </section>
      <section>
        <About />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
