import React from 'react';
import {Box} from "@mui/material"


class UserCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: props.username,
            elo: props.elo,
            profilePicture: undefined
        }
    }    

    render(){
        return (
            <Box className="UserCard">
                
            </Box>
        )
    }
}

export default UserCard;