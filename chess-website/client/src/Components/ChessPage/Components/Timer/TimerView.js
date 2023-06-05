import React from 'react';
import { Box, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';

import "./TimerView.css";

class TimerView extends React.Component{

    hasTimeLeft(){
        return this.props.time > 0;
    }

    getStylingClasses(){
        let stylingClasses = "TimerView";

        if (!this.props.enabled){
            stylingClasses += " Disabled";
        }
        if (this.props.color === "b"){
            stylingClasses += " Black";
        }
        return stylingClasses;
    }

    //Returns the remaining time in string format.
    //If >30 seconds remain, display as "MM:SS".
    //Otherwise, display as :SS.T (tenths)
    getRemainingTime(){
        if (!this.hasTimeLeft()){
            if (this.props.time === undefined || this.props.time === null){
                return "--:--";
            }
            return "00:00";
        }
        let minutes = Math.floor(this.props.time / 60000);
        let seconds = (Math.floor(this.props.time % 60000) / 1000).toFixed(0);

        if (seconds == 60){
            seconds = 0;
            minutes++;
        }

        const secondsString = seconds < 10 ? "0" + seconds : seconds;
        const minutesString = minutes < 10 ? "0" + minutes : minutes;
        

        return minutesString + ":" + secondsString;
    }

    render(){
        return (
            <Box className={this.getStylingClasses()} >
                <Typography variant="h4">
                    {this.getRemainingTime()}
                </Typography>
            </Box>
        );
    }
}

export default TimerView;