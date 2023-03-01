import React from "react";
import {connect} from "react-redux";
import axios from "axios";


//Matchmaking is where a user will be able to select the game mode & wait to be paired with another user.
class Matchmaking extends React.Component{

    componentDidMount(){
        if (this.props.user.email != null)

        //Send message to server to be placed in matchmaking pool
        axios.post("http://localhost:4000/matchmaking", {email: this.props.user.email})
        .then((response) => {
            console.log(response);   
        });
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