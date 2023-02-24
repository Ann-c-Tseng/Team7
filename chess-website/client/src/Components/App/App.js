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
import Matchmaking from "../Matchmaking/Matchmaking";
import History from "../Pages/History";
import Leaderboard from "../Pages/Leaderboard";
import Rules from "../Pages/Rules";

class App extends Component {
  render() {
    const ChessMasterTitleStyle = {
      color: '#320c74',
      backgroundColor: '#FFF0F5',
    };

    return(
      <div className="App">
      {<Navigation />}                     
      <h1 style={ChessMasterTitleStyle}><Link to="/" title='Home'>Chess Master</Link></h1>

        <Routes>
              <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/chess" element={<ChessPage userColor = {"b"}/>} />
                <Route path="/matchmaking" element={<Matchmaking/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/history" element={<History />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
        </Routes>
      {/* {<Footer />} */}
      </div>
    );
  }
}

export default App;
