import React from "react";
import { Typography, Box } from "@mui/material";
import ChessGame from "../ChessPage/Components/ChessGame/ChessGame";
import Footer from "../ChessPage/Components/Footer/Footer";

import "./HomePage.css";

const textColor = "#fefefedf"
const bodyTypographyStyling = {
    color: textColor,
    textOverflow: "break-word"
}

const HomePage = () => {

    return (
        <>
        <Box className="HomePageContent">
            <Typography
                variant="h2"
                sx={{
                    color:textColor,
                    paddingBottom: "30px"
                }}>
                Welcome to Chess Master!
            </Typography>
            <Box className="Block">
                <Box className="Game">
                    <ChessGame
                        relativeWidth={0.3}
                        relativeHeight={0.5}
                        boardOrientation="w"
                    />
                </Box>
                <Box className="Text">
                    <Typography 
                        variant="h5"
                        sx={bodyTypographyStyling}
                    >
                        Here, you can learn, play, and spectate chess with all of your friends!
                        <br />
                        <br />
                        Try dragging the pieces around, just for fun!
                        <br />
                        <br />
                        Create a profile to begin playing. Then, click "Play Chess!" to join matchmaking and be paired with someone else!
                    </Typography>
                </Box>
            </Box>
            <Box className="Block">
                <Box className="Text">
                    <Typography 
                        variant="h5"
                        sx={bodyTypographyStyling}
                    >
                        When you finish a game, check out your history to see the games you've played. Review them, learn from your mistakes, and climb the leaderboard!
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Footer />
        </>

    );
};

export default HomePage;