import React from "react";
import './PageNotFound.css';
import { Link } from 'react-router-dom'


const PageNotFound = () => (

    <div className="PageNotFound">
        <div className="scene">

            <div className="textPageNotFound"> Oops, Page Not Found... </div>

            <Link class="cta-btn" to="/">Back to Home</Link>

            <br />
            <br />
            <br />
        </div>
    </div>
);

export default PageNotFound;