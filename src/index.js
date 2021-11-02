import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import Powerslap from "./components/video/vvv.mp4";
ReactDOM.render(
    <>
    <video autoPlay loop muted
    style={{
        position:"absolute",
        width: "100%",
        // left: "50%",
        // top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "transform(-50%, -50%)",
        zIndex: -1,

    }}>
        <source src={Powerslap} type="video/mp4"/>
    </video>
<App/>
</>
 ,document.getElementById('root'));