import React from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

/**
 * Protects the route embedded within, forcing the
 * user to be authenticated to pass. If not authenticated,
 * the user is returned to the login screen.
 * If already passed and they somehow become deauthenticated,
 * they are still returned to the login.
 */
class ProtectedRoute extends React.Component {
  /**
   * Doesn't actually have a visible render. Just renders the component within.
   * @return {component}
   */
  render() {
    const authenticated = this.props.userAuthenticated;
    // Maybe in the future, verify their auth token
    if (authenticated) {
      console.log('returning paragraph');
      return this.props.component;
    } else {
      return <Navigate to="/login"/>;
    }
  }
}

ProtectedRoute.propTypes = {
  userAuthenticated: PropTypes.bool,
  component: PropTypes.element,
};


const mapStateToProps = (state) => {
  return {
    userAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
