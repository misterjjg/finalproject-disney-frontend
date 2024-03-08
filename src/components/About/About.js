import "./About.css";
import AboutPic from "../../images/AboutPic.svg";

const About = () => {
  return (
    <section className="about">
      <img className="about__image" src={AboutPic} alt="about pic" />
      <div className="about__title-paragraph">
        <h2 className="about__title">About the author</h2>
        <div className="about__paragraph_container">
          <p className="about__paragraph">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__paragraph">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
