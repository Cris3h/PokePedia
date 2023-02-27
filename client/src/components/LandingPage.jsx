import React from "react";
// import pokeBall from '../images/pokeBall.jpg'
import "../styles/LandingPage.css";

const LandingPage = () => (
  <div className="landing-container">

    <div className="title-landing">
      <h1>Welcome to the PokePedia!</h1>
    </div>


    <div className="info-container-landing">
      <h3 className="info-lading"> - Look for your favourite pokemon</h3>
      <h3 className="info-lading"> - Create new ones</h3>
      <h3 className="info-lading"> - Don't forget to have fun!</h3>
    </div>

    <div className="btn-landing-container">
      <a href="/home" className="btn-landing">Enter</a>
    </div>
  </div>
);

export default LandingPage;
