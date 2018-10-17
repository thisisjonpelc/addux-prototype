import React from "react";
import {connect} from "react-redux";
import Modal from "react-modal";
import YouTube from "react-youtube";
import Vimeo from 'react-vimeo';
import $ from 'jquery';

import AppOverlay from './AppOverlay';
import VimeoVideo from './VimeoVideo';

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
        const videoId = this.props.walkthrough[`${this.props.category}_video`];

        var $frame = $(`iframe#${videoId}`);

        // saves the current iframe source
        var vidsrc = $frame.attr('src');

        // sets the source to nothing, stopping the video
        $frame.attr('src',''); 

        // sets it back to the correct link so that it reloads immediately on the next window open
        $frame.attr('src', vidsrc);

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
                        <use xlinkHref="/img/sprite.svg#icon-video-solid"></use>
                    </svg>
                </div>

                <AppOverlay
                    isOpen={this.state.showVideo}
                    onRequestClose={this.handleCloseModal}
                >

                    <VimeoVideo id={videoId} />

                    
                </AppOverlay>
            </div>
        );
    }
}


export default ColumnHeader;