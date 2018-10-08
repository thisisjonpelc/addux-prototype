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
                <img src="img/addux-logo.png" className="logo" />

                        
                        <div onClick={this.showEditModal} className="info-box">
                                <h1 className="info-box__title">{this.props.activeAddux.name}</h1>
                            </div>
                        
                </header>
        </div>
    );
}

export default HeaderSharing;