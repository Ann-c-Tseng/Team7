import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";

const Profile = () => {
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    // const userProfilePic = require('../../Images/tentativeProfile.png');
    const userProfile = useSelector((state) => state.auth.user.avatar);
    const username = useSelector((state) => state.auth.user.username);
    const useremail = useSelector((state) => state.auth.user.email);
    const dispatch = useDispatch();

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

    useEffect(() => {
        axios.post('http://localhost:4000/profile', {email:useremail})
        .then((response) =>{
            setUserData(response.data);
            setLoading(false);
            console.log(response.data);
        })
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }    

    return (
        <>
            <div style={overallDivStyle}>
                {/* <img style={ProfilePicStyle} src={userProfilePic} alt="User profile"/> */}
                <img style={ProfilePicStyle} src={userProfile} alt="User profile"/>
                <h3>{username}</h3>
                <h4 style={h4Style}>ELO: {userData.elo}</h4>
                <h4 style={h4Style}> User ID: {userData.id}</h4>
                <h4 style={h4Style}> Email: {useremail}</h4>
                <h4 style={h4Style}> Longest Win Streak: 0 out of 0 games </h4>
                <h4 style={h4Style}> Total wins: 0 games </h4>
                <button style={gameHistoryButton}>View Game History</button>
                <button style={gameHistoryButton} onClick={() => dispatch({type: "auth/logout"})}>Logout</button>
            </div>
        </>
    );
};

export default Profile;