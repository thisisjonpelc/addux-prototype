import React from "react";
import Modal from "react-modal";
import {connect} from 'react-redux';
import axios from 'axios';


import AdduxNameForm from "./AdduxNameForm";
import {addAddux, setActive} from "./../actions/addux";

const HeaderSharing = (props) => {
    return (
        <div>
            <header className="header">
                <img src="/img/addux-logo.png" className="logo" />
                        
                        <div  className="info-box">
                            <h1 className="info-box__title">{props.activeAddux.name}</h1>
                            <div className="info-box__progress-bar"></div>
                        </div>
                        
                </header>
        </div>
    );
}

export default HeaderSharing;