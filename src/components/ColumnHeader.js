import React from "react";
import {connect} from "react-redux";
import Modal from "react-modal";
import YouTube from "react-youtube";

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
                    <YouTube videoId={this.props.video} />
            </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        video: state.walkthrough[`${ownProps.category}_video`]
    }
}

export default connect(mapStateToProps)(ColumnHeader);