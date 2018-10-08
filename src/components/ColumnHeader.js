import React from "react";
import {connect} from "react-redux";
import Modal from "react-modal";
import YouTube from "react-youtube";
import Vimeo from 'react-vimeo';

import {labels} from "../constants/constants";

class ColumnHeader extends React.Component{
    constructor(props){
        super(props);

        Modal.setAppElement('#app');

        this.state = {
            showVideo: false
        }
    }

    onHeaderClick = () => {
        console.log("CLICKED!");
        this.setState({
            showVideo:true
        });
    }

    handleCloseModal = () => {
        console.log("CLOSING MODAL");

        this.setState({
            showVideo:false
        });
    }

    render(){
        const videoId = this.props.walkthrough[`${this.props.category}_video`];

        return (
            <div>
            <div onClick={this.onHeaderClick} className="column-header">
                <span className="column-header__text">{labels[this.props.category]}</span>
                <svg className="column-header__icon">
                    <use href="img/sprite.svg#icon-video-solid"></use>
                </svg>
            </div>

            <Modal
                    isOpen={this.state.showVideo}
                    contentLabel="A helpful video guide"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                >
                <iframe src={`https://player.vimeo.com/video/${videoId}`} width="640" height="360" frameBorder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowFullScreen></iframe>           
            </Modal>
            </div>
        );
    }
}


export default ColumnHeader;