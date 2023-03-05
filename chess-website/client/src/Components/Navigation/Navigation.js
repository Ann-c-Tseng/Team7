import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "./Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            {this.props.isAuthenticated ? 
            <>
              <li><Link to="/chess"><button>Play Chess!</button></Link></li>
              <li><Link to="/profile"><button>Profile</button></Link></li>
              <li><Link to="/history"><button>History</button></Link></li>
              <li><Link to="/leaderboard"><button>Leaderboard</button></Link></li>
              <li><Link to="/rules"><button>Rules</button></Link></li>
            </>
            :
            <>
              <li><Link to="/login"><button>Log In</button></Link></li>
              <li><Link to="/signup"><button>Sign Up</button></Link></li>
            </>
            }
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Navigation);