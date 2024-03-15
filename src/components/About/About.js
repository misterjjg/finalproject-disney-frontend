import "./About.css";
import React from "react";

function About() {
  return (
    <section className="about">
      <img className="about__image" alt="Author" />
      <div className="about__container">
        <h2 className="about__title">About the Author</h2>
        <p className="about__description">
          Hello! My name is Joshua Gonzalez and I am the maker of this website.
          I am an aspiring software engineer and wish to keep expanding my
          knowledge of programming languages to keep creating applications.
        </p>
        <p className="about__description">
          Everything I learned about software engineering was through
          TripleTen's bootcamp. Within a year my knowledge about coding has
          grown more than ever before. This program may have been rigorous at
          times but glad I went through it.
        </p>
      </div>
    </section>
  );
}

export default About;
