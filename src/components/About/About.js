import "./About.css";
import React from "react";
import AboutPic from "../../images/AboutPic.svg";

const About = () => {
  return (
    <div className="about">
      <div className="about__section">
        <img className="about__image" src={AboutPic} alt="Author Image" />
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <div className="about__paragraph">
            <p className="about__paragraph-text">
              Hello! My name is Joshua Gonzalez and I am the maker of this
              website. I am an aspiring software engineer and wish to keep
              expanding my knowledge of programming languages to keep creating
              applications.
            </p>
            <p className="about__paragraph-text">
              Everything I learned about software engineering was through
              TripleTen's bootcamp. Within a year my knowledge about coding has
              grown more than ever before. This program may have been rigorous
              at times but glad I went through it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
