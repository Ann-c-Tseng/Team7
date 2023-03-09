import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import "./Navigation.css";

import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const alwaysAvailable = [
    <Link to="/spectate" className="link"><button className="nav-button">Spectate Games</button></Link>,
    <Link to="/leaderboard" className="link"><button className="nav-button">Leaderboard</button></Link>,
    <Link to="/rules" className="link"><button className="nav-button">Rules</button></Link>,
  ]

  const unAuthenticatedButtons = [
    <Link to="/" className="link"><button className="nav-home">Chess Master</button></Link>,
    <Link to="/login" className="link"><button className="nav-button">Log In</button></Link>,
    <Link to="/signup" className="link"><button className="nav-button">Sign Up</button></Link>,

  ]

  const authenticatedButtons = [
    <Link to="/" className="link"><button className="nav-home">Chess Master</button></Link>,
    <Link to="/chess" className="link"><button className="nav-button">Play Chess!</button></Link>,
    <Link to="/profile" className="link"><button className="nav-button">Profile</button></Link>,
    <Link to="/history" className="link"><button className="nav-button">History</button></Link>,
  ]

  if (isAuthenticated) {
    return (
      <Box className="nav">
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          variant="text"
        >
          {authenticatedButtons}
          {alwaysAvailable}
        </ButtonGroup>
      </Box>
    )
  } else {
    return (
      <Box className="nav">
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          variant="text"
        >
          {unAuthenticatedButtons}
          {alwaysAvailable}
        </ButtonGroup>
      </Box>
    )
  }
  
}

export default Navigation;











// class Navigation extends React.Component {
//   render() {
//     return (
//       <div className="nav-container">
//         <nav>
//           <ul>
//             <li><Link to="/"><button className='home'>Chess Master</button></Link></li>
//             {this.props.isAuthenticated ? 
//             <>
//               <li><Link to="/chess"><button>Play Chess!</button></Link></li>
//               <li><Link to="/profile"><button>Profile</button></Link></li>
//               <li><Link to="/history"><button>History</button></Link></li>
//               <li><Link to="/leaderboard"><button>Leaderboard</button></Link></li>
//               <li><Link to="/rules"><button>Rules</button></Link></li>
//             </>
//             :
//             <>
//               <li><Link to="/login"><button>Log In</button></Link></li>
//               <li><Link to="/signup"><button>Sign Up</button></Link></li>
//             </>
//             }
//           </ul>
//         </nav>
//       </div>
//     );
//   }
// }
