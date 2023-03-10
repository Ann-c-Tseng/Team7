import React from 'react';
import {ToggleButton, ToggleButtonGroup, Box} from "@mui/material";

import blackQueen from "../../../../Images/black-queen.svg";
import blackRook from "../../../../Images/black-rook.svg";
import blackBishop from "../../../../Images/black-bishop.svg";
import blackKnight from "../../../../Images/black-knight.svg";

import whiteQueen from "../../../../Images/white-queen.svg";
import whiteRook from "../../../../Images/white-rook.svg";
import whiteBishop from "../../../../Images/white-bishop.svg";
import whiteKnight from "../../../../Images/white-knight.svg";

//ToggleButtonGroup doesn't accept fragments, so provide an array of the buttons instead:

const whitePieces = [{picture: whiteQueen, value: 'q'}, {picture: whiteRook, value: 'r'}, {picture: whiteBishop, value: 'b'}, {picture: whiteKnight, value: 'n'}];
const blackPieces = [{picture: blackQueen, value: 'q'}, {picture: blackRook, value: 'r'}, {picture: blackBishop, value: 'b'}, {picture: blackKnight, value: 'n'}];


//TODO maybe change to SVGIcon
const buttonMaker = (button) => {
    return (<ToggleButton
                key={button.value}
                value={button.value}
            >
                <img src={button.picture} />
            </ToggleButton>)
}

class PromotionSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: 'q'
        }
        this.setActive = this.setActive.bind(this);
    }
    setActive(event, newSelection){
        event.preventDefault();
        if (newSelection === null){
            return;
        }

        this.setState({
            selected: newSelection
        });

        this.props.changeHandler(newSelection);
    }

    render(){
        return (
            <Box>
                <p className="PromotionText">Promote to:</p>
                <ToggleButtonGroup 
                    className="Buttons" 
                    orientation="vertical" 
                    exclusive
                    value={this.state.selected}
                    onChange={this.setActive}>
                        { this.props.user === "w" ? whitePieces.map(buttonMaker) : blackPieces.map(buttonMaker) }
                </ToggleButtonGroup>
            </Box>
        )
    }
}

export default PromotionSelect;