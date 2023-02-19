import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css";

class Navigation extends React.Component {
    render() {
      return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/matchmaking"><button>Play!</button></Link></li> {/*May be temporary, only for testing matchmaking*/}
                    <li><Link to="/login"><button>Log In</button></Link></li>
                    <li><Link to="/signup"><button>Sign Up</button></Link></li>
                </ul>
            </nav>
        </div>
      );
    }
}

export default Navigation;