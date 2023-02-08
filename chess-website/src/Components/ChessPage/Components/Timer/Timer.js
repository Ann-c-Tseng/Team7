import React from 'react';
import { Box, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';

import "./Timer.css";

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            intervalId: null, //Keep track of the intervalId (if enabled)
            enabled: false,
            time: props.time, //How long the timer is in milliseconds
            color: props.color //White or black
        };
    }
    componentDidMount(){
        

        this.enable();
    }

    enable(){
        if (this.state.enabled){
            console.warn("Tried to start an enabled timer");
            return;
        }
        if (!this.hasTimeLeft()){
            return;
        }
        let start = Date.now()
        
        this.setState({intervalId: 
            setInterval(() => {
                const now = Date.now()
                const diff = now - start;
                this.setState({time: this.state.time - (diff)});
                start = now;
            }, 100),
            isEnabled: true
        });
    }
    disable(){
        clearInterval(this.state.intervalId);
        this.setState({intervalId: null, isEnabled: false});
    }
    hasTimeLeft(){
        return this.state.time > 0;
    }

    //Returns the remaining time in string format.
    //If >30 seconds remain, display as "MM:SS".
    //Otherwise, display as :SS.T (tenths)
    getRemainingTime(){
        if (!this.hasTimeLeft()){
            if (this.state.time == undefined || this.state.time == null){
                return "--:--";
            }
            return "00:00";
        }
        const minutes = Math.floor(this.state.time / 60000);
        const seconds = (Math.floor(this.state.time % 60000) / 1000).toFixed(0);

        const minutesString = minutes < 10 ? "0" + minutes : minutes;
        const secondsString = seconds < 10 ? "0" + seconds : seconds;

        return minutesString + ":" + secondsString;
    }

    render(){
        return (
            <Box className="Timer">
                <Typography variant="h5">
                 {this.getRemainingTime()}</Typography>
            </Box>
        );
    }
}

export default Timer;