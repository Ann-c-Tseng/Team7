import React from 'react';
import {PropTypes} from 'prop-types';
import {Chessboard} from 'react-chessboard';

/**
 * The container for the chessboard, containing stuff for resizing the board
 * and customization options
 */
class ChessGame extends React.Component {
  /**
   * Initializes board size
   * @param {object} props - usually has width and height to set size of
   * board
   */
  constructor(props) {
    super(props);

    const size = this.calculateSize();

    this.state = {
      width: size,
      height: size,
    };
  }
  /**
   * a math function to determine how large to make the board
   * @return {number}
   */
  calculateSize() {
    return Math.min(window.innerWidth * this.props.relativeWidth,
        window.innerHeight * this.props.relativeHeight);
  }

  /**
   * Automatically resize board when the window size changes
   */
  componentDidMount() {
    window.addEventListener('resize', () => {
      const newSize = this.calculateSize();

      this.setState({
        width: newSize,
        height: newSize,
      });
    });
  }

  /**
   * Gets the color string from 'w' and 'b'
   * @param {string} col - 'w' or 'b'
   * @return {string}
   */
  getOrientationString(col) {
    return (col === 'w' ? 'white' : 'black');
  }

  /**
   * Renders the board
   * @component
   * @return {component}
   */
  render() {
    return (
      <div data-testid='chessboard'>
        <Chessboard
          className="Chessboard"
          boardWidth={this.state.width}
          boardHeight={this.state.height}
          position={this.props.gameState}
          onPieceDrop={this.props.moveHandler}
          boardOrientation={
            this.getOrientationString(this.props.boardOrientation)
          }
          arePiecesDraggable={!(this.props.mode === 'Spectator')}
          /* Special styling options for later
          customBoardStyle={}
          customSquareStyles={}
          customDarkSquareStyle={}
          customLightSquareStyle={}
          customPremoveDarkSquareStyle={}
          customPremoveLightSquareStyle={}
          (Square being hovered over with dragged piece)
          cutomDropSquareStyle={}
          */
        />
      </div>
    );
  }
}

ChessGame.propTypes = {
  relativeWidth: PropTypes.number,
  relativeHeight: PropTypes.number,
  gameState: PropTypes.string,
  moveHandler: PropTypes.func,
  boardOrientation: PropTypes.oneOf(['w', 'b']),
  mode: PropTypes.string,
};

export default ChessGame;
