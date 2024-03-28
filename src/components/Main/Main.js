import "./Main.css";
import { useContext } from "react";
import Header from "../Header/Header";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import IsLoadingContext from "../../contexts/IsLoadingContext";
import Preloader from "../Preloader/Preloader";

function Main({ signinClick, signoutClick }) {
  const { isLoading } = useContext(IsLoadingContext);

  return (
    <>
      <Header onSigninClick={signinClick} onSignoutClick={signoutClick} />
      <section className="main">
        <div className="main__results">
          {isLoading === false ? (
            <>
              <NewsCardList />
            </>
          ) : (
            <Preloader />
          )}
        </div>
        <About />
      </section>
    </>
  );
}

export default Main;
