import Header from "../components/Header/Header";
import SavedNews from "../components/SavedNews/SavedNews";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import Preloader from "../components/Preloader/Preloader";
import Footer from "../components/Footer/Footer";

const SavedNewsPage = ({
  onLoginModal,
  onRegisterModal,
  onClose,
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
      <Header
        onLoginModal={onLoginModal}
        onRegisterModal={onRegisterModal}
        onClose={onClose}
        onMenuModal={onMenuModal}
        onSignOut={onSignOut}
        currentPage={"Saved News"}
      />
      <section>
        <SavedNews
          onLoginModal={onLoginModal}
          onRegisterModal={onRegisterModal}
          onClose={onClose}
          onMenuModal={onMenuModal}
        />
      </section>
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
      <Footer />
    </div>
  );
};

export default SavedNewsPage;
