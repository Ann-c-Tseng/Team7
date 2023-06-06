import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from '@mui/material';
import '@fontsource/roboto/700.css';

import './TimerView.css';

/**
 * The renderable container for a timer. It sits in a box
 * that is either black or white. If >30 seconds remain, display as "MM:SS".
 * Otherwise, display as :SS.T (tenths)
 */
class TimerView extends React.Component {
  /**
   * Returns whether or not the timer has time left.
   * @return {bool}
   */
  hasTimeLeft() {
    return this.props.time > 0;
  }

  /**
   * Used by the render function to change appearance
   * based on what's happening
   * @return {string}
   */
  getStylingClasses() {
    let stylingClasses = 'TimerView';

    if (!this.props.enabled) {
      stylingClasses += ' Disabled';
    }
    if (this.props.color === 'b') {
      stylingClasses += ' Black';
    }
    return stylingClasses;
  }

  /**
   * Returns the remaining time in string format.
   * If >30 seconds remain, display as "MM:SS".
   * Otherwise, display as :SS.T (tenths)
   * @return {string}
   */
  getRemainingTime() {
    if (!this.hasTimeLeft()) {
      if (this.props.time === undefined || this.props.time === null) {
        return '--:--';
      }
      return '00:00';
    }
    let minutes = Math.floor(this.props.time / 60000);
    let seconds = (Math.floor(this.props.time % 60000) / 1000).toFixed(0);

    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }

    const secondsString = seconds < 10 ? '0' + seconds : seconds;
    const minutesString = minutes < 10 ? '0' + minutes : minutes;


    return minutesString + ':' + secondsString;
  }

  /**
   * Renders the timer view.
   * @component
   * @return {component}
   */
  render() {
    return (
      <Box className={this.getStylingClasses()} >
        <Typography variant="h4">
          {this.getRemainingTime()}
        </Typography>
      </Box>
    );
  }
}

TimerView.propTypes = {
  time: PropTypes.number,
  enabled: PropTypes.bool,
  color: PropTypes.string,
};

export default TimerView;
