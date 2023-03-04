import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import io from "socket.io-client";


//Matchmaking is where a user will be able to select the game mode & wait to be paired with another user.
class Matchmaking extends React.Component{

    componentDidMount(){
        if (this.props.user.email != null){
            axios.post("http://localhost:4000/matchmaking", {email: this.props.user.email})
            .then((response) => {
                if (response.data === true) {
                    //Establish a socket connection with the server
                    console.log("establishing socket");
                    const socket = io("http://localhost:4000");
                    
                }
            });
        }
    }

    render(){
        
        return (
            <p>Searching for opponent...</p>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Matchmaking);