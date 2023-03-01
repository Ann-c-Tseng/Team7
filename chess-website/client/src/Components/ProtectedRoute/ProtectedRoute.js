import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import authSlice from "../../Store/Slices/authSlice";

class ProtectedRoute extends React.Component{
    render(){
        let authenticated = this.props.userAuthenticated;
        //Maybe in the future, verify their auth token
        if (authenticated){
            return this.props.component;
        }
        else{
            //Also let the user know they need to login. (add a notification)
            return <Navigate to="/login"/>
        }
    }
}
const mapStateToProps = state => {
    return {
        userAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(ProtectedRoute);