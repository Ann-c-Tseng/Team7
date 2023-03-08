import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
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
    return(
      <div className="App">
      {<Navigation />}                     
      
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

// <h1 style={titleStyle}><Link to="/" title='Home'>Chess Master</Link></h1>

