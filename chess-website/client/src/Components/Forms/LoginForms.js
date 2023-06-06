import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {login} from '../../Store/Slices/authSlice';
import {isEmail} from 'validator';
import './Forms.css';

/**
 * Contains the login form page and logic
 */
class LoginForm extends Component {
  /**
   * Sets up the login field page.
   */
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      tooManyRequests: false,
      loginFailed: false,
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Triggers whenever the email field is changed.
   * @param {object} event - contains the new state of the field
   */
  changeEmail(event) {
    const email = event.target.value;
    this.setState({
      email,
      validEmail: isEmail(email),
    });
  }

  /**
   * Triggers whenever the password field is changed.
   * @param {object} event - contains the new state of the field
   */
  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  /**
   * Triggers when the user presses submit. Checks the validity
   * of each field, sending a login request if requirements are met.
   * @param {object} event - contains event information
   */
  onSubmit(event) {
    event.preventDefault();
    if (!this.state.validEmail) {
      alert('Invalid email!');
      return;
    }

    axios.post('/login',
        {email: this.state.email, password: this.state.password})
        .then((response) => {
          if (response.data.success === true) {
            this.props.login(response.data.username, response.data.email);
            window.location = '/profile';
          } else {
            this.setState({
              tooManyRequests: false,
              loginFailed: true,
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 429) {
            this.setState({
              tooManyRequests: true,
            });
          }
        });
  }

  /**
   * Renders the login page.
   * @component
   * @return {component}
   */
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
              <p className="badField">{!this.state.validEmail ?
                'Must be valid email' : ' '}</p>

              <input type='password'
                placeholder='Password'
                onChange={this.changePassword}
                value={this.state.password}
                className='form-control form-group'
              />

              <p className="badField">{this.state.tooManyRequests ?
                'Too many requests. Come back later.' : ' '}</p>
              <p className="badField">{this.state.loginFailed ?
                'Incorrect email or password.' : ' '}</p>

              <input type='submit'
                className='btn btn-danger btn-block'
                value='Submit'
              />
            </form>
            <Link className="forget-pass" to="/signup">Create an Account</Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, email) => {
      dispatch(login({username, email}));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
