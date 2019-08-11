import React from "react";
import $ from "jquery";

import AppOverlay from "./AppOverlay";
import VimeoVideo from "./VimeoVideo";

import { labels } from "../constants/constants";

class ColumnHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideo: false
    };
  }

  onHeaderClick = () => {
    if (this.props.showVideos) {
      this.setState({
        showVideo: true
      });
    }
  };

  handleCloseModal = () => {
    const videoId = this.props.walkthrough[`${this.props.category}_video`];

    var $frame = $(`iframe#${videoId}`);

    // saves the current iframe source
    var vidsrc = $frame.attr("src");

    // sets the source to nothing, stopping the video
    $frame.attr("src", "");

    // sets it back to the correct link so that it reloads immediately on the next window open
    $frame.attr("src", vidsrc);

    this.setState({
      showVideo: false
    });
  };

  render() {
    const videoId = this.props.walkthrough[`${this.props.category}_video`];

    return (
      <div>
        <div onClick={this.onHeaderClick} className="column-header">
          <span className="column-header__text">
            {`${labels[this.props.category]}${
              this.props.category === "goals" ||
              this.props.category === "projects"
                ? "s"
                : ""
            }`}
          </span>
          <svg className="column-header__icon">
            <use xlinkHref="/img/sprite.svg#icon-video-solid" />
          </svg>
        </div>

        {this.props.showVideos && (
          <AppOverlay
            isOpen={this.state.showVideo}
            onRequestClose={this.handleCloseModal}
          >
            <VimeoVideo id={videoId} />
          </AppOverlay>
        )}
      </div>
    );
  }
}

export default ColumnHeader;
