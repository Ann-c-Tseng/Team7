import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import {Link} from "react-router-dom";
import './App.css';

import Navigation from "../Navigation/Navigation";
import HomePage from "../Pages/HomePage";
import LoginForm from "../Forms/LoginForms";
import SignupForm from "../Forms/SignupForms";
import ChessPage from "../ChessPage/ChessPage";
import PageNotFound from "../Pages/PageNotFound";
import Profile from "../Pages/Profile";
import History from "../Pages/History";
import Leaderboard from "../Pages/Leaderboard";
import Rules from "../Pages/Rules";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

class App extends Component {
  render() {
    const ChessMasterTitleStyle = {
      color: '#320c74',
      backgroundcolor: 'black',
      transform: 'translate(-41%, -110%)'
    };

    //Split between protected routes and non-protected routes?
    return(
      <div className="App">
      {<Navigation />}                     
      <h3 style={ChessMasterTitleStyle}><Link to="/"><button>Chess Master</button></Link></h3>

        <Routes>
              <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/chess" element={<ProtectedRoute component={<ChessPage/>} />} />
                <Route path="/profile" element={<ProtectedRoute component={<Profile/>} />} />
                <Route path="/history" element={<ProtectedRoute component={<History/>} />} />
                <Route path="/leaderboard" element={<ProtectedRoute component={<Leaderboard/>} />} />
                <Route path="/rules" element={<ProtectedRoute component={<Rules/>} />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
        </Routes>
      {/* {<Footer />} */}
      </div>
    );
  }
}

export default App;
