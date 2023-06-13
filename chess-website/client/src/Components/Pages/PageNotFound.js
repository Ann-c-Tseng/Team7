import React from 'react';
import './PageNotFound.css';
import {Link} from 'react-router-dom';
import {Typography} from '@mui/material';

const textColor = '#fefefedf';
const bodyTypographyStyling = {
  color: textColor,
  textOverflow: 'break-word',
};

const PageNotFound = () => (

  <div className="PageNotFound">
    <div className="scene">

      <Typography
        className="textPageNotFound"
        variant='h3'
        sx={bodyTypographyStyling}
      > Oops, Page Not Found... </Typography>

      <Link className="cta-btn" to="/">Back to Home</Link>
    </div>
  </div>
);

export default PageNotFound;
