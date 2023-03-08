import React from "react";

const HomePage = () => {
    const chessHomePageImage = require('../../Images/chessHomePageImg.jpg');

    const HomePageDivStyle = {
        backgroundColor: 'black',
        width: '100%',
        color: 'white'
    };
    const HomePageImageStyle = {
        width:'60%',
        height:'50%',
    };
  
    return (
        <>
            <div style={HomePageDivStyle}>
                <p> Log In or Sign Up to begin playing...</p>
                <img style={HomePageImageStyle} src={chessHomePageImage} alt="Two knight chess pieces having a stare down"/>
            </div>
        </>
    );
};

export default HomePage;