// import React from 'react';
// import {Link} from 'react-router-dom';
// import './Forms.css';


// function LoginForm() {
//     return (
//         <>
//             <div className="card">
//                 <form>
//                     <div>
//                         <h2 className="title"> Login</h2>
//                     </div>
//                     <div className="email-login">
//                         <label htmlFor="email"> <b>Email</b></label>
//                         <input type="text" placeholder="name@abc.com" name="uname" required />
//                         <label htmlFor="psw"><b>Password</b></label>
//                         <input type="password" placeholder="8+ (a, A, 1, #)" name="psw" required />
//                     </div>
//                     <button className="cta-btn">Login</button>
//                     <Link className="forget-pass" to="/signup">Create an Account</Link>
//                 </form>
//             </div>
//         </>
//     );

// }

// export default LoginForm;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

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
        var authPassed = Boolean(false);

        //Super Important: Connects to Server and MongoDB, code is async so need .then for further response processing
        axios.get('http://localhost:4000/login', {email: this.state.email, password: this.state.password})
        .then((response) => {
            console.log("user input from login: " + this.state.email + " " + this.state.password)
            if(Object.keys(response.data).length === 0) {
                //If response.data return empty object {}, then cannot find user in database
                alert("Cannot find user's email");
            } else {
                //Otherwise, either we get a response of "true", meaning password and email are both correct and within database
                //Or false, which means password is incorrect (but email is found in database) - all these checks are done in backend already.
                alert("it passed");

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
 
export default LoginForm;