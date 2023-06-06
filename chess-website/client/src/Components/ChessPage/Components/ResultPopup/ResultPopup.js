import React from 'react';
import {PropTypes} from 'prop-types';
import {Box, IconButton, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './ResultPopup.css';

/**
 * The popup that appears when the game is finished.
 * Also used as a notification of sorts.
 */
class ResultPopup extends React.Component {
  /**
   * Renders the popup. It can also be disabled.
   * @component
   * @return {component}
   */
  render() {
    return (
      this.props.notification.active ?
      <Box className="Transparency">
        <Box className="GameOverPopup">
          <Typography
            className="Title"
            fontSize={25}
          >{this.props.notification.title}
          </Typography>
          <Typography
            className="Details"
            fontSize={20}
          >{this.props.notification.details}
          </Typography>
          <Box className="DoneButton">
            <IconButton
              onClick={this.props.acceptHandler}
              title="Dismiss"
            ><CheckIcon size="large"/>
            </IconButton>
          </Box>
        </Box>
      </Box> : null
    );
  }
}

ResultPopup.propTypes = {
  notification: PropTypes.exact({
    active: PropTypes.bool,
    title: PropTypes.string,
    details: PropTypes.string,
  }),
  acceptHandler: PropTypes.func,
};

export default ResultPopup;
