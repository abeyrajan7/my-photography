import React, { useEffect } from "react";
import "./About.css";
import myImage from "../../assets/PhotographerImg/20240610_224549.jpg";

export const About = () => {
  useEffect(() => {
    const aboutText = document.querySelector(".aboutText");
    const mainImage = document.querySelector(".mainImage");

    mainImage.addEventListener("animationend", () => {
      setTimeout(() => {
        aboutText.classList.add("visible");
      }, 0);
    });
  }, []);

  return (
    <div className="about">
      <img className="mainImage" src={myImage} alt="About" />
      <div className="aboutText">
        <h1 className="name">Hello, I'm Abey,</h1>
        <p className="details">
          A freelance photographer passionate about storytelling through the
          lens. Armed with my trusty Nikon Z30, I began my photography journey
          in 2022, driven by the belief that every picture should narrate a
          compelling tale. With an eye for detail and a knack for finding
          captivating frames, I aim to create images that delight and inspire.
          Join me as we embark on a visual adventure, capturing moments and
          crafting stories one click at a time.
        </p>
      </div>
    </div>
  );
};
