import React from 'react';
import {PropTypes} from 'prop-types';
import {Box, Typography, Avatar} from '@mui/material';

import './UserCard.css';
/**
 * The user cards above and below the chess game being played.
 * Shows ELO, profile picture, and username.
 */
class UserCard extends React.Component {
  /**
   * Renders the card.
   * @component
   * @return {component}
   */
  render() {
    return (
      <Box className="UserCard">
        {this.props.username ?
          <Typography
            variant="h6"
            className="Username"
          >{this.props.username}
            {this.props.elo ? '(' + this.props.elo + ')' : null}
          </Typography> :
          null}
        {this.props.avatarEnabled ?
          <Avatar
            sx={{width: 50, height: 50}}
            variant="square"
            className="ProfilePicture"
            alt={this.props.username + '\'s profile picture'}
            src={this.props.profilePicture}
          /> : null}
      </Box>
    );
  }
}

UserCard.propTypes = {
  username: PropTypes.string,
  elo: PropTypes.number,
  profilePicture: PropTypes.string,
  avatarEnabled: PropTypes.bool,
};

export default UserCard;
