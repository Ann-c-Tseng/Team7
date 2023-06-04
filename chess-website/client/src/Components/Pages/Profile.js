import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import {Box, Button, Typography} from "@mui/material";

import "./Profile.css";

const textColor = "#fefefedf"
const bodyTypographyStyling = {
    color: textColor,
    textOverflow: "break-word"
}

const Profile = () => {
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    const username = useSelector((state) => state.auth.user.username);
    const useremail = useSelector((state) => state.auth.user.email);
    const dispatch = useDispatch();

    const logoutButtonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        width: 'fit-content',
        minWidth: '100px',
        height: '40px',
        padding: '8px',
        borderRadius: '5px',
        boxShadow: '0px 0px 20px -20px',
        backgroundColor: '#2b2725',
        userSelect: 'none',
        fontWeight: 'bold',
        color: 'white',
    }

    useEffect(() => {
        axios.post('/profile', {email:useremail})
        .then((response) =>{
            setUserData(response.data);
            setLoading(false);
        })
    }, []);

    if (isLoading) {
        return <Typography variant="h3" sx={bodyTypographyStyling}>Loading...</Typography>;
    }    

    return (
        <Box className="ProfileContainer">
            <Typography variant="h3" sx={bodyTypographyStyling}>Profile</Typography>
            <Box className="ProfileContent">
                <Typography variant="h3" sx={bodyTypographyStyling}>{username}</Typography>
                <br />
                <Typography variant="h5" sx={bodyTypographyStyling}>ELO: {userData.elo}</Typography>
                <br />
                <Typography variant="h5" sx={bodyTypographyStyling}>User ID: {userData.id}</Typography>
                <br />
                <Typography variant="h5" sx={bodyTypographyStyling}>Email: {useremail}</Typography>
                <br />
                <Typography variant="h5" sx={bodyTypographyStyling}>Longest Win Streak: (not implemented) </Typography>
                <br />
                <Typography variant="h5" sx={bodyTypographyStyling}>Total wins: (also not implemented) </Typography>
                <br />
                <Button style={logoutButtonStyle} onClick={() => dispatch({type: "auth/logout"})}>Logout</Button>
            </Box>
        </Box>
    );
};

export default Profile;