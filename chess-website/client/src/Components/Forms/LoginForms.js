import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {connect} from "react-redux";
import {login} from '../../Store/Slices/authSlice';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:4000/login', {email: this.state.email, password: this.state.password})
        .then((response) => {
            if (response.data?.success === true){
                this.props.login(response.data.username, response.data.email);
                setTimeout(() => {console.log(this.props.username)}, 1000);
                setTimeout(() => {window.location = '/profile'}, 3000);
                //Redirect to user profile after login successful
            }
            else{
                console.log("login failure");
                alert("Your email or password is incorrect")
            }
        })
    }


    render() { 
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text'
                            placeholder='E-mail'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className='form-control form-group'
                            />

                            <input type='password'
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group'
                            />

                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                        </form>
                        <Link className="forget-pass" to="/signup">Create an Account</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, email) => {
            dispatch(login({username, email}))
        }
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.user.username,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);