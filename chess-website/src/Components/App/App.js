import React from 'react';
import './App.css';
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
}

export default App;
