import logo from './logo.svg';
import './App.css';
import { Chessboard } from "react-chessboard";

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
      </header>
      
    </div>
    <Chessboard 
        className="Chessboard"
        boardWidth={800}
        boardHeight={800}
      />
    </>
  );
}

export default App;
