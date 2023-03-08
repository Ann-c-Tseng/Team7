import React from 'react';
import {Box, IconButton, Typography} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import "./ResultPopup.css";

class ResultPopup extends React.Component{
    render(){
        return (
            this.props.notification.active ? 
            <Box className="Transparency">
                <Box className="GameOverPopup"> 
                    <Typography className="Title" fontSize={25}>{this.props.notification.title}</Typography>
                    <Typography className="Details" fontSize={20}>{this.props.notification.details}</Typography>
                    <Box className="DoneButton">
                        <IconButton  onClick={this.props.acceptHandler} title="Dismiss"><CheckIcon size="large"/></IconButton>
                    </Box>
                    
                </Box>
            </Box> : null
        );
    }
}

export default ResultPopup;