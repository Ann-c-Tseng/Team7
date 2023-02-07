import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
<<<<<<< HEAD

import Navigation from "../Navigation/Navigation";
import HomePage from "../Pages/HomePage";
import LoginForm from "../Forms/LoginForms";
import SignupForm from "../Forms/SignupForms";
import PageNotFound from "../Pages/PageNotFound";
// import Footer from "../Footer/Footer";

import { Chessboard } from "react-chessboard";

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
                <Route path="*" element={<PageNotFound />} />
              </Route>
        </Routes>
      {/* {<Footer />} */}

      {/* Chessboard display - comment out Routes + uncomment below to see interactive board */}
      {/* <Chessboard 
        className="Chessboard"
        boardWidth={800}
        boardHeight={800}
      /> */}
      </div>
    );
  }
=======
import ChessGame from '../ChessGame/ChessGame.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
   <BrowserRouter> 
      <Routes>
        <Route path="/" element={<ChessGame/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 82395e7 (Moved routing to App)
}

export default App;
