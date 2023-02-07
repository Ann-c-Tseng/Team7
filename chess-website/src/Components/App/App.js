import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';

import Navigation from "../Navigation/Navigation";
import HomePage from "../Pages/HomePage";
import LoginForm from "../Forms/LoginForms";
import SignupForm from "../Forms/SignupForms";
import PageNotFound from "../Pages/PageNotFound";
// import Footer from "../Footer/Footer";
import ChessGame from "../ChessGame/ChessGame.js";

class App extends Component {
  render() {
    const ChessMasterTitleStyle = {
      color: '#320c74',
      backgroundColor: '#FFF0F5',
    };

    return(
      <div className="App">
      {<Navigation />}
      <h1 style={ChessMasterTitleStyle}>Chess Master</h1>
        <Routes>
              <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/chess" element={<ChessGame />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
        </Routes>
      {/* {<Footer />} */}
      </div>
    );
  }
}

export default App;
