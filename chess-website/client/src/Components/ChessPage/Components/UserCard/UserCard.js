import React from 'react';
import {Box, Typography, Avatar} from "@mui/material"

import "./UserCard.css";

class UserCard extends React.Component{
    render(){
        return (
            <Box className="UserCard">
                {this.props.username ? 
                <Typography variant="h6" className="Username">{this.props.username} {this.props.elo ? "(" + this.props.elo + ")" : null}</Typography> : null}
                {this.props.avatarEnabled ?
                    <Avatar
                        sx={{width: 50, height: 50}}
                        variant="square"
                        className="ProfilePicture"
                        alt={this.props.username + "'s profile picture"}
                        src={this.props.profilePicture}
                    /> : null}
            </Box>
        )
    }
}

export default UserCard;