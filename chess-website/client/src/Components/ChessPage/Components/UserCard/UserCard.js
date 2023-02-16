import React from 'react';
import {Box, Typography, Avatar} from "@mui/material"

import "./UserCard.css";

class UserCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: props.username,
            elo: props.elo || 1000,
            profilePicture: undefined
        }
    }

    render(){
        return (
            <Box className="UserCard">
                {this.state.username ? <Typography variant="h6" className="Username">{this.state.username} ({this.state.elo})</Typography> : null}
                <Avatar sx={{width: 50, height: 50}} variant="square" className="ProfilePicture" alt={this.state.username + "'s profile picture"} src={this.state.profilePicture} />
            </Box>
        )
    }
}

export default UserCard;