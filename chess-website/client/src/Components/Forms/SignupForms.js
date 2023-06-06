import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {login} from '../../Store/Slices/authSlice';
import {connect} from 'react-redux';
import {isEmail, isAlphanumeric, equals} from 'validator';
import './Forms.css';
/**
 * The page where users sign up to the site.
 */
class SignupForm extends Component {
  /**
   * Initializes the state of the page, including setting validity of fields.
   */
  constructor() {
    super();
    this.state = {
      fullName: '',
      validName: false,
      username: '',
      validUsername: false,
      email: '',
      validEmail: false,
      password: '',
      validPassword: false,
      passwordConfirm: '',
      passwordsMatch: true,
      accountExists: false,
    };

    this.changeFullName = this.changeFullName.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePasswordConfirm = this.changePasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Triggers whenever the full name field is changed.
   * @param {object} event - contains the new state of the field
   */
  changeFullName(event) {
    const fullName = event.target.value;
    this.setState({
      fullName,
      validName: (fullName.length >= 3 &&
                        fullName.length <= 30 &&
                        isAlphanumeric(fullName)),
    });
  }

  /**
   * Triggers whenever the username field is changed.
   * @param {object} event - contains the new state of the field
   */
  changeUsername(event) {
    const username = event.target.value;
    this.setState({
      username,
      validUsername: (username.length >= 3 &&
                            username.length <= 30 &&
                            isAlphanumeric(username)),
    });
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
    const password = event.target.value;
    this.setState({
      password,
      validPassword: password.length >= 8,
      passwordsMatch: equals(password, this.state.passwordConfirm),
    });
  }

  /**
   * Triggers whenever the password confirm field is changed.
   * @param {object} event - contains the new state of the field
   */
  changePasswordConfirm(event) {
    const passwordConfirm = event.target.value;
    this.setState({
      passwordConfirm,
      passwordsMatch: equals(passwordConfirm, this.state.password),
    });
  }

  /**
   * Triggers when the user presses submit. Checks the validity
   * of each field, sending a sign up request if requirements are met.
   * @param {object} event - contains event information
   */
  onSubmit(event) {
    event.preventDefault();

    if (this.state.validEmail &&
        this.state.validName &&
        this.state.validPassword &&
        this.state.validUsername &&
        this.state.passwordsMatch) {
      const registered = {
        fullName: this.state.fullName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      axios.post('/signup', registered)
          .then((response) => {
            if (response.data.success) {
              this.props.login(response.data.username, response.data.email);
              window.location = '/profile';
            } else {
              if (response.data.message === 'Account already exists') {
                this.setState({
                  accountExists: true,
                });
              } else {
                alert('Server failed to validate data');
              }
            }
          });
    }
  }

  /**
   * Renders the signup page.
   * @component
   * @return {component}
   */
  render() {
    return (
      <div>
        <div className='container'>
          <div className='form-div'>
            <form onSubmit={this.onSubmit}>
              <input type = 'text'
                placeholder="Full Name"
                onChange={this.changeFullName}
                value={this.state.fullName}
                className='form-control form-group'
              />
              <p className="badField">{!this.state.validName ?
                'Must be 3-30 characters & alphanumeric' : ' '}</p>

              <input type='text'
                placeholder='Username'
                onChange={this.changeUsername}
                value={this.state.username}
                className='form-control form-group'
              />
              <p className="badField">{!this.state.validUsername ?
                'Must be 3-30 characters & alphanumeric' : ' '}</p>

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
              <p className="badField">{!this.state.validPassword ?
                'Passwords must contain at least 8 characters' : ' '}</p>

              <input type='password'
                placeholder='Confirm password'
                onChange={this.changePasswordConfirm}
                value={this.state.passwordConfirm}
                className='form-control form-group'
              />
              <p className="badField">{!this.state.passwordsMatch ?
                'Passwords must match' : ' '}</p>

              <input type='submit'
                className='btn btn-danger btn-block'
                value='Submit'
              />
              <p className="badField">{this.state.accountExists ?
                'Account with this email already exists' : ' '}</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, email) => {
      dispatch(login({username, email}));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignupForm);
