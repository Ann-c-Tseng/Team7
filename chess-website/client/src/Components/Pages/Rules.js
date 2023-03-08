import * as React from 'react';
import { Chessboard } from "react-chessboard";

import './Rules.css'
import './Table.css'

import whiteKing from '../../Images/white-king.svg'
import whiteQueen from '../../Images/white-queen.svg'
import whiteBishop from '../../Images/white-bishop.svg'
import whiteRook from '../../Images/white-rook.svg'
import whiteKnight from '../../Images/white-knight.svg'
import whitePawn from '../../Images/white-pawn.svg'

export default function Rules() {
  return (
    <div className='rules-container'>
    <div className='rules'>
      <h1>Rules of Chess</h1>
      <h2>Initial Setup</h2>
      <p>
        Chess is played on a chessboard, a square board divided into a grid
        of 64 squares (eight-by-eight) of alternating color (similar to the
        board used in draughts).[1] Regardless of the actual colors of the
        board, the lighter-colored squares are called "light" or "white",
        and the darker-colored squares are called "dark" or "black". Sixteen
        "white" and sixteen "black" pieces are placed on the board at the
        beginning of the game. The board is placed so that a white square
        is in each player's near-right corner. Horizontal rows are called
        ranks, and vertical columns are called files.
      </p>
      <div className='container'>
        <div className='piece-table'>
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
        </div>
        <div className='board'>
          <Chessboard arePiecesDraggable={false}/>
        </div>
      </div>
      <p>
        At the beginning of the game, the pieces are arranged as shown in the
        diagram: for each side one king, one queen, two rooks, two bishops,
        two knights, and eight pawns. The pieces are placed, one per square,
        as follows:
        <ul>
          <li>Rooks are placed on the outside corners, right and left edge.</li>
          <li>Knights are placed immediately inside of the rooks.</li>
          <li>Bishops are placed immediately inside of the knights.</li>
          <li>The queen is placed on the central square of the same color of
            that of the piece: white queen on the white square and black queen
            on the black square.</li>
          <li>The king takes the vacant spot next to the queen.</li>
          <li>Pawns are placed one square in front of all of the other pieces.</li>
        </ul>
      </p>
      <h2>Gameplay</h2>
      <p>
        The player controlling the white pieces is named "White"; the player
        controlling the black pieces is named "Black". White moves first, then
        players alternate moves. Making a move is required; it is not legal to
        skip a move, even when having to move is detrimental. Play continues
        until a king is checkmated, a player resigns, or a draw is declared,
        as explained below. In addition, if the game is being played under a
        time control, a player who exceeds the time limit loses the game unless
        they cannot be checkmated.
      </p>
      <p>
        The official chess rules do not include a procedure for determining who
        plays White. Instead, this decision is left open to tournament-specific
        rules (e.g. a Swiss system tournament or round-robin tournament) or, in
        the case of non-competitive play, mutual agreement, in which case some
        kind of random choice is often employed. A common method is for one player
        to conceal a piece (usually a pawn) of each color in either hand; the other
        player chooses a hand to open and receives the color of the piece that is
        revealed.
      </p>
      <h3>Movement</h3>
      <h4>Basic Moves</h4>
      <p>
        Each type of chess piece has its own method of movement. A piece moves to
        a vacant square except when capturing an opponent's piece.
        Except for any move of the knight and castling, pieces cannot jump over
        other pieces. A piece is captured (or taken) when an attacking enemy piece
        replaces it on its square. The captured piece is thereby permanently
        removed from the game. The king can be put in check but cannot be
        captured (see below).
        <ul>
          <li>The king moves exactly one square horizontally, vertically, or
            diagonally. A special move with the king known as castling is allowed
            only once per player, per game (see below).</li>
          <li>A rook moves any number of vacant squares horizontally or vertically.
            It also is moved when castling.</li>
          <li>A bishop moves any number of vacant squares diagonally.</li>
          <li>The queen moves any number of vacant squares horizontally, vertically,
            or diagonally.</li>
          <li>A knight moves to one of the nearest squares not on the same rank,
            file, or diagonal. (This can be thought of as moving two squares
            horizontally then one square vertically, or moving one square
            horizontally then two squares vertically—i.e. in an "L" pattern.)
            The knight is not blocked by other pieces; it jumps to the new
            location.</li>
          <li>Pawns have the most complex rules of movement:
            <ul>
              <li>A pawn moves straight forward one square, if that square is
                vacant. If it has not yet moved, a pawn also has the option of
                moving two squares straight forward, provided both squares are
                vacant. Pawns cannot move backwards.</li>
              <li>A pawn, unlike other pieces, captures differently from how it
                moves. A pawn can capture an enemy piece on either of the two
                squares diagonally in front of the pawn. It cannot move to those
                squares when vacant except when capturing en passant.</li>
              <li>The pawn is also involved in the two special moves en passant
                and promotion.</li>
            </ul>
          </li>
        </ul>
      </p>
      <h4>Castling</h4>
      <p>
        Castling consists of moving the king two squares towards a rook, then
        placing the rook on the other side of the king, adjacent to it. It is
        not allowed to move both king and rook in the same time, because "Each
        move must be played with one hand only." Castling is only permissible
        if all of the following conditions hold:
        <ul>
          <li>The king and rook involved in castling must not have previously moved;</li>
          <li>There must be no pieces between the king and the rook;</li>
          <li>The king may not currently be under attack, nor may the king pass
            through or end up in a square that is under attack by an enemy piece
            (though the rook is permitted to be under attack and to pass over an
            attacked square);</li>
          <li>The castling must be kingside or queenside as shown in the diagram.</li>
        </ul>
        An unmoved king and an unmoved rook of the same color on the same rank are said
        to have castling rights.
      </p>
      <h4>En Passant</h4>
      <p>
        When a pawn advances two squares from its original square and ends the turn adjacent
        to a pawn of the opponent's on the same rank, it may be captured en passant by that
        pawn of the opponent's, as if it had moved only one square forward. This capture is
        only legal on the opponent's next move immediately following the first pawn's advance.
      </p>
      <h4>Promotion</h4>
      <p>
        If a player advances a pawn to its eighth rank, the pawn is then promoted
        (converted) to a queen, rook, bishop, or knight of the same color at the
        choice of the player (a queen is usually chosen). The choice is not limited
        to previously captured pieces. Hence it is theoretically possible for a player
        to have up to nine queens or up to ten rooks, bishops, or knights if all of
        their pawns are promoted. If the desired piece is not available, the player
        must call the arbiter to provide the piece.
      </p>
      <h3>Check</h3>
      <p>
        A king is in check when it is under attack by at least one enemy piece.
        A piece unable to move because it would place its own king in check
        (it is pinned against its own king) may still deliver check to the
        opposing player.
        It is illegal to make a move that places or leaves one's king in check.
        The possible ways to get out of check are:
        <ul>
          <li>Move the king to a square where it is not in check.</li>
          <li>Capture the checking piece (possibly with the king).</li>
          <li>Block the check by placing a piece between the king and
            the opponent's threatening piece.</li>
        </ul>
        If it is not possible to get out of check, the king is checkmated and the
        game is over (see the next section).
        In informal games, it is customary to announce "check" when making a move
        that puts the opponent's king in check. However, in formal competitions,
        check is rarely announced.
      </p>
      <h3>End of the Game</h3>
      <h4>Checkmate</h4>
      <p>
        If a player's king is placed in check and there is no legal move that player
        can make to escape check, then the king is said to be checkmated, the game ends,
        and that player loses. Unlike the other pieces, the king is never captured.
      </p>
      <h4>Resigning</h4>
      <p>
        Either player may resign at any time. Under USCF Rules, this concedes the game
        to the opponent. A player may resign by saying it verbally or by indicating it
        on the score sheet in any of three ways: (1) by writing "resigns", (2) by
        circling the result of the game, or (3) by writing "1–0" if Black resigns or "0–1"
        if White resigns. Tipping over the king also indicates resignation, but it should
        be distinguished from accidentally knocking the king over. Stopping both clocks is
        not an indication of resigning, since clocks can be stopped to call the arbiter.
        An offer of a handshake is sometimes used, but it could be mistaken for a draw
        offer.
        Under FIDE Laws, a resignation by one player results in a draw if their opponent
        has no way to checkmate them via any series of legal moves, or a loss by that
        player otherwise.
      </p>
      <h4>Draws</h4>
      <p>
        The game ends in a draw if any of these conditions occur:
        <ul>
          <li>The player to move is not in check and has no legal move. This situation
            is called a stalemate.</li>
          <li>The game reaches a dead position.</li>
          <li>Both players agree to a draw after one of the players makes such an
            offer.</li>
          <li>The player having the move claims a draw by correctly declaring that one
            of the following conditions exists, or by correctly declaring an intention
            to make a move which will bring about one of these conditions:</li>
          <ul>
            <li>The same board position has occurred three times with the same
              player to move and all pieces having the same rights to move,
              including the right to castle or capture en passant (see threefold
              repetition rule).</li>
            <li>here has been no capture or pawn move in the last fifty moves by
              each player, if the last move was not a checkmate (see fifty-move
              rule).</li>
          </ul>
          <li>The arbiter intervenes to declare a draw, without a draw request necessary:
            <ul>
              <li>When the same board position has occurred five times (see fivefold repetition rule).</li>
              <li>When the moves without capture or pawn move extend up to seventy-five
                (see seventy-five-move rule).</li>
            </ul>
          </li>
          <li>A player would normally lose by running out of time or by resigning, but their opponent has
            no way to checkmate them via any series of legal moves.</li>
        </ul>
        There is no longer a rule specifically defining perpetual check as a draw.
        In such a situation, either the threefold repetition rule or the fifty-move
        rule will eventually come into effect. More often, the players will simply
        agree to a draw.
      </p>
      <p>Source: https://en.wikipedia.org/wiki/Rules_of_chess</p>
    </div>
    </div>
  )
}