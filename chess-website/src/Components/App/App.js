import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';

import Navigation from "../Navigation/Navigation";
import HomePage from "../Pages/HomePage";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
// import PageNotFound from "../Pages/PageNotFound";
// import Footer from "../Footer/Footer";

import { Chessboard } from "react-chessboard";

class App extends Component {
  render() {
    return(
      <div className="App">
      {<Navigation />}
      <h1>Chess Master</h1>
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
}

export default App;


// return (
//   <>
//   <div className="App">
//     <header className="App-header">
//     </header>
    
//   </div>
//   <Chessboard 
//       className="Chessboard"
//       boardWidth={800}
//       boardHeight={800}
//     />
//   </>
// );