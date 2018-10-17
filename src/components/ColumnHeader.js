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
                    <use xlinkHref="/img/sprite.svg#icon-video-solid"></use>
                </svg>
            </div>

            <Modal
                    style = {{
                        content:{
                            top:'50%',
                            left:'50%',
                            transform: 'translate(-50%, -50%)',
                            width:'70rem',
                            height:'41rem'
                        }
                    }}
                    isOpen={this.state.showVideo}
                    contentLabel="A helpful video guide"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                >
                <div style={{
                        padding:'56.25% 0 0 0',
                        positon:'relative'
                }}>
                    <iframe src="https://player.vimeo.com/video/293412302?title=0&byline=0&portrait=0" 
                            style={{
                                position: 'absolute',
                                top:0,
                                left:0,
                                width:'100%',
                                height:'100%'
                            }}
                            frameBorder="0" 
                            webkitallowfullscreen='true' 
                            mozallowfullscreen='true' 
                            allowFullScreen={true}>
                    </iframe>
                </div>
                
            </Modal>
            </div>
        );
    }
}


export default ColumnHeader;