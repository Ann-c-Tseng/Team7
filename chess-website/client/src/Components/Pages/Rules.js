import * as React from 'react';
import {Chessboard} from 'react-chessboard';
import {Box, Typography} from '@mui/material';

import './Rules.css';
import whiteKing from '../../Images/white-king.svg';
import whiteQueen from '../../Images/white-queen.svg';
import whiteBishop from '../../Images/white-bishop.svg';
import whiteRook from '../../Images/white-rook.svg';
import whiteKnight from '../../Images/white-knight.svg';
import whitePawn from '../../Images/white-pawn.svg';

const textColor = '#fefefedf';
const bodyTypographyStyling = {
  color: textColor,
  textOverflow: 'break-word',
  margin: '10px',
};
/**
 * The rules page for chess.
 * @return {component}
 */
export default function Rules() {
  return (
    <Box className='rules-container'>
      <Typography variant="h3"
        sx={bodyTypographyStyling}
      >Rules of Chess
      </Typography>
      <Box className='BlockCol'>
        <Typography
          variant="h4"
          sx={bodyTypographyStyling}
        >Setup & Board
        </Typography>
        <Typography
          variant="h6"
          sx={bodyTypographyStyling}
        >The chess board consists of 64 alternating light and dark squares.
          During play, the board is oriented such that each player
          has a white square at their bottom right corner.
          The pieces are placed on the board in a specific manner.
          Each player starts with 16 pieces, consisting of one king,
          one queen, two rooks, two knights, two bishops, and eight pawns.
          <br/>
          <br/>
          The pieces are arranged as seen on the board.
        </Typography>
        <Box className='container'>
          <Box className='piece-table'>
            <table>
              <thead>
                <tr>
                  <th>Piece</th>
                  <th>Symbol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>King</td>
                  <td><img src={whiteKing} alt=''/></td>
                </tr>
                <tr>
                  <td>Queen</td>
                  <td><img src={whiteQueen} alt=''/></td>
                </tr>
                <tr>
                  <td>Bishop</td>
                  <td><img src={whiteBishop} alt=''/></td>
                </tr>
                <tr>
                  <td>Rook</td>
                  <td><img src={whiteRook} alt=''/></td>
                </tr>
                <tr>
                  <td>Knight</td>
                  <td><img src={whiteKnight} alt=''/></td>
                </tr>
                <tr>
                  <td>Pawn</td>
                  <td><img src={whitePawn} alt=''/></td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box className='board'>
            <Chessboard arePiecesDraggable={false}/>
          </Box>
        </Box>
      </Box>
      <Box className='BlockCol'>
        <Typography
          variant="h4"
          sx={bodyTypographyStyling}
        >Movement & Capturing
        </Typography>
        <Typography
          variant="h6"
          sx={bodyTypographyStyling}
        >Each chess piece has its own unique way of moving across the board.
          Here is a brief overview of how each piece moves:
          <br/>
          <br/>
          Pawns move forward one or two squares on their first move, and
          one square forward on subsequent moves.Pawns can only capture
          diagonally, one square ahead and to the left or right.
          <br/>
          <br/>
          Rooks can move horizontally or vertically any number of squares.
          They cannot jump over pieces.
          <br/>
          <br/>
          Knights move in an L-shape, two squares in any direction
          and then one square in the other. Knights CAN jump over pieces.
          <br/>
          <br/>
          Bishops move diagonally any number of squares.
          They cannot jump over pieces.
          <br/>
          <br/>
          The queen can move horizontally, vertically, or diagonally
          any number of squares. She cannot jump over pieces.
          <br/>
          <br/>
          The king can move one square in any direction,
          as long as it would not put him into check.
          <br/>
          <br/>
          When a piece lands on a square occupied by an opponent's piece,
          that piece is captured and removed from the board.
        </Typography>
      </Box>
      <Box className='BlockCol'>
        <Typography
          variant="h4"
          sx={bodyTypographyStyling}
        >Check & Checkmate
        </Typography>
        <Typography
          variant="h6"
          sx={bodyTypographyStyling}
        >A player's king is said to be in check when
          it is under attack by an opponent's piece. The player MUST take
          action to get their king out of check on their next move.
          There are three ways to get out of check:
          <br/>
          <br/>
          <ul>
            <li>Move the king to a safe square where
              it is not under attack.
            </li>
            <li>
              Block the attack by placing a piece
              between the king and the attacking piece.
            </li>
            <li>Capture the attacking piece.</li>
          </ul>
          <br/>
          Checkmate occurs when a player's king is in check and there
          is no legal move that can be made to get out of check.
          Checkmate is the ultimate goal of the game of chess, and the player
          who checkmates their opponent's king wins the game.
          It isn't the only way a game can end, so read on to learn more.
        </Typography>
      </Box>
      <Box className='BlockCol'>
        <Typography
          variant="h4"
          sx={bodyTypographyStyling}
        >Special Rules
        </Typography>
        <Typography
          variant="h6"
          sx={bodyTypographyStyling}
        >There are a few special rules in chess
          that are important to understand:
          <br/>
          <br/>
          <ul>
            <li>
              En Passant: When a pawn moves two squares forward
              from its starting position, an opposing pawn may capture it
              as if it had only moved one square. This capture must be made on
              the move immediately following the double-square pawn advance,
              otherwise the right to capture en passant is lost.
            </li>
            <li>
              Castling: This move is a defensive maneuver where the king is
              moved two squares towards a rook, and that rook is moved to
              the square over which the king crossed. This move is only legal
              if neither the king nor the rook has moved previously in the
              game, there are no pieces between the king and the rook, the king
              is not in check. You cannot castle through a square which is
              targeted by an enemy piece.
            </li>
            <li>
              Promotion: When a pawn reaches the opposite side of the board,
              it can be promoted to any other piece except the king.
              This means that a player can have more than one queen,
              or more knights, bishops, or rooks on the board at a time.
            </li>
          </ul>
          Understanding these special rules is
          important for playing chess at a higher level.
          Pay attention to the board!
        </Typography>
      </Box>
      <Box className='BlockCol'>
        <Typography
          variant="h4"
          sx={bodyTypographyStyling}
        >Game Ending
        </Typography>
        <Typography
          variant="h6"
          sx={bodyTypographyStyling}
        >There are many ways game of chess can end:
          <br/>
          <br/>
          <ul>
            <li>
              Checkmate: As mentioned earlier,
              a player wins the game by checkmating their opponent's king.
            </li>

            <li>
              Resignation: If a player believes that they are in a hopeless
              position, they may resign the game.
            </li>

            <li>
              Draw: A game can end in a draw for several reasons, including:
            </li>
            <ul>
              <li>
                Stalemate: If a player is not in check but has no legal
                move to make, the game is drawn due to stalemate.
              </li>
              <li>
                Threefold repetition: If the same position occurs three
                times with the same player to move, the game is drawn.
              </li>

              <li>
                Fifty-move rule: If fifty moves are made by each player
                without any captures or pawn moves, the game is drawn.
              </li>

              <li>
                Insufficient material: If both players have insufficient
                material to deliver checkmate (such as king versus king,
                or king and bishop versus king), the game is drawn.
              </li>
            </ul>
          </ul>
          Understanding how the game can end is important for
          knowing when to fight on and when to concede defeat.
          Good luck on your chess adventure!
        </Typography>
      </Box>
    </Box>
  );
}
