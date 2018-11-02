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
            //text: props.activeAddux[`${props.category}`] ? props.activeAddux[`${props.category}`] : ""
        }
    }

    render() {
        //console.log("RENDERING COLUMN CONTENT!");
        //console.log(this.props.showComments);
        const prompt = this.props.walkthrough[`${this.props.category}_prompt`];
        
        return (
            <div className="column__content">
                <p className="column__question">
                    {prompt}
                </p>

                {accordionSize[this.props.category] > 1 
                    ? 
                    (<Accordion 
                        linked={this.props.linked}
                        onCheckChange={this.props.onCheckChange} 
                        openFields={this.props.openFields} 
                        activeAddux={this.props.activeAddux} 
                        category={this.props.category} 
                        readOnly={this.props.readOnly} 
                    />) 
                    : 
                    (<div className='objective-block'>
                        <p className='objective-block__label'>Objective</p>
                        <ObjectiveTextArea 
                            key={`${this.props.activeAddux._id}-obj`} 
                            initialText={this.state.text} 
                            category={this.props.category}
                            activeAddux={this.props.activeAddux} 
                            id={this.props.activeAddux._id} 
                            readOnly={this.props.readOnly}/>
                    </div>)
                }
                {
                    this.props.showComments 
                        && 
                    <CommentsForm 
                        key={`${this.props.activeAddux._id}-comments`} 
                        category={this.props.category} 
                        comment={this.props.activeAddux[`${this.props.category}_comments`]}
                        active={this.props.activeAddux._id}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        //activeAddux: state.addux[state.addux.active],
        //prompt: state.walkthrough[`${ownProps.category}_prompt`],
        //active: state.addux.active
    }
}

export default connect(mapStateToProps)(ColumnContent);