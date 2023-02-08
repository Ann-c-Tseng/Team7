import React from 'react';
import { Box, Typography } from "@mui/material";
import '@fontsource/roboto/700.css';

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emabled: true,
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
        
        this.setState({enabled: true});
        if (!this.hasTimeLeft()){
            return;
        }
        let start = Date.now()
        setInterval(() => {
            const now = Date.now()
            const diff = now - start;
            this.setState({time: this.state.time - (diff)});
            start = now;
        }, 100);
    }
    disable(){

    }
    hasTimeLeft(){
        return this.state.time > 0;
    }
    //Returns the remaining time in string format.
    getRemainingTime(){
        if (!this.hasTimeLeft()){
            return "00:00";
        }
        const minutes = Math.floor(this.state.time / 60000);
        const seconds = (Math.floor(this.state.time % 60000) / 1000).toFixed(0);
        return (minutes < 10 ? "0" + minutes : minutes) + ":"
             + (seconds < 10 ? "0" + seconds : seconds);
    }

    render(){
        
        return (
            this.state.time ? 
            <Typography>{this.getRemainingTime()}</Typography>
            : null
        );
    }
}

export default Timer;