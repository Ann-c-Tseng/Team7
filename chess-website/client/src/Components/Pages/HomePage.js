import React from "react";
import './HomePage.css'

const HomePage = () => {
    const chessHomePageImage = require('../../Images/chessHomePageImg.jpg');
  
    return (
        <>
            <div className="HomePageDivStyle">
                <p> Log In or Sign Up to begin playing...</p>
                <img src={chessHomePageImage} alt="Two knight chess pieces having a stare down"/>
            </div>
        </>
    );
};

export default HomePage;