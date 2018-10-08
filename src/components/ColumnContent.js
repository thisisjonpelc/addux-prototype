import React from "react";
import {connect} from "react-redux";

import Accordion from "./Accordion";
import CommentsForm from "./CommentsForm";
import ObjectiveTextArea from "./ObjectiveTextArea";

import {accordionSize} from "./../constants/constants";

class ColumnContent extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            text: props.activeAddux[`${props.category}`] ? props.activeAddux[`${props.category}`] : ""
        }
    }

    render() {
        console.log("RENDERING COLUMN CONTENT!");
        console.log(this.props.showComments);
        return (
            <div className="column__content">
                <p className="column__question">
                    {this.props.prompt}
                </p>

                {accordionSize[this.props.category] > 1 ? (<Accordion active={this.props.active} category={this.props.category} readOnly={this.props.readOnly} />) : (<ObjectiveTextArea key={`${this.props.active}-obj`} initialText={this.state.text} category={this.props.category} id={this.props.activeAddux._id} readOnly={this.props.readOnly}/>)}
                {this.props.showComments && <CommentsForm key={`${this.props.active}-comments`} category={this.props.category}/>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        activeAddux: state.addux[state.addux.active],
        prompt: state.walkthrough[`${ownProps.category}_prompt`],
        active: state.addux.active
    }
}

export default connect(mapStateToProps)(ColumnContent);