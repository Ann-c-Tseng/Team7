import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css";

class Navigation extends React.Component {
    render() {
      return (
        <div>
            <nav>
                <ul>
                    <li><button>Log In</button></li>
                    <li><button>Sign Up</button></li>
                </ul>
            </nav>
        </div>
      );
    }
}

export default Navigation;