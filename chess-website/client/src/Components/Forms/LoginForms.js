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
import './Forms.css';

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

        //Super Important: Connects to Server and MongoDB, code is async so need .then for further response processing
        axios.post('http://localhost:4000/login', {email: this.state.email, password: this.state.password})
        .then((response) => {
            if (response.data === true){
                console.log("success")
                console.log(response);
                window.location = '/profile' //Redirect to user profile after login successful
            }
            else{
                console.log("login failure");
                alert("Your email or password is incorrect")
            }
        })
    }


    render() { 
        return (
            <div className='style'>
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