import React, { useState } from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import "./Navigation.css";

import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const alwaysAvailable = [
    <Link to="/spectate" className="link" key="spectate"><button className="nav-button">Spectate Games</button></Link>,
    <Link to="/leaderboard" className="link" key="leaderboard"><button className="nav-button">Leaderboard</button></Link>,
    <Link to="/rules" className="link" key="rules"><button className="nav-button">Rules</button></Link>,
  ]

  const unAuthenticatedButtons = [
    <Link to="/" className="link" key="home"><button className="nav-home">Chess Master</button></Link>,
    <Link to="/login" className="link" key="login"><button className="nav-button">Log In</button></Link>,
    <Link to="/signup" className="link" key="signup"><button className="nav-button">Sign Up</button></Link>,
  ]

  const authenticatedButtons = [
    <Link to="/" className="link" key="home"><button className="nav-home">Chess Master</button></Link>,
    <Link to="/chess" className="link" key="chess"><button className="nav-button">Play Chess!</button></Link>,
    <Link to="/profile" className="link" key="profile"><button className="nav-button">Profile</button></Link>,
    <Link to="/history" className="link" key="history"><button className="nav-button">History</button></Link>,
  ]

  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  }

  return (
    <>
      <div
        className={`nav-collapse${isCollapsed ? " collapsed" : ""}`}
        onClick={toggleCollapse}
      >
        <div className="nav-collapse-button">
          {isCollapsed ? "" : "<"}
        </div>
      </div>
      {
        <Box className={"nav" + (isCollapsed ? " collapsed" : "")}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            variant="text"
          >
            {isAuthenticated ? authenticatedButtons : unAuthenticatedButtons}
            {alwaysAvailable}
          </ButtonGroup>
        </Box>
      }
    </>
  );

      }

export default Navigation;