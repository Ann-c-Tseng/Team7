import React from "react";
import {Link} from "react-router-dom";

const Profile = () => {
    const userProfilePic = require('../../Images/tentativeProfile.png');

    const overallDivStyle = {
        width: '40vw',
        padding: '3em',
        backgroundColor: 'white',
        borderRadius: 10,
    }

    const ProfilePicStyle = {
        flex: 1,
        width: 200, 
        height: 200, 
        borderRadius: 200/2,
        resizeMode: 'contain',
    };

    const h4Style = {
        textAlign: 'left',
    }

    const gameHistoryButton = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        width: 'fit-content',
        minWidth: '80px',
        height: '35px',
        padding: '8px',
        borderRadius: '5px',
        boxShadow: '0px 0px 20px -20px',
        backgroundColor: '#320c74',
        userSelect: 'none',
        fontWeight: 'bold',
        color: 'white',
    }
  
    return (
        <>
            <div style={overallDivStyle}>
                <img style={ProfilePicStyle} src={userProfilePic} alt="User profile"/>
                <h3> Username: PorcupineKnight</h3>
                <h4 style={h4Style}>ELO: 1601</h4>
                <h4 style={h4Style}> User ID: aBrIABLECKSHaUC</h4>
                <h4 style={h4Style}> Longest Win Streak: 4 out of 5 games </h4>
                <h4 style={h4Style}> Total wins: 4 games </h4>
                <button style={gameHistoryButton}>View Game History</button>
            </div>
        </>
    );
};

export default Profile;