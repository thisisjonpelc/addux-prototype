import React from "react";
import {connect} from "react-redux";
import {debounce} from 'throttle-debounce';
import axios from 'axios';

import Accordion from "./Accordion";
import CommentsForm from "./CommentsForm";
import {accordionSize} from "./../constants/constants";

class ColumnContent extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            text: props.activeAddux[`${props.category}`] ? props.activeAddux[`${props.category}`] : ""
        }
    }

    
    saveText = debounce(1000, () => {
        console.log('SAVING INPUT');
        //console.log(this.props.comment);
        //console.log(this.props.comment._id);
        //console.log(`/comments/${this.props.comment._id.toHexString()}`);

        const updates = {};

        updates[`${this.props.category}`] = this.state.text;

        console.log(updates);

        axios.patch(
            `/addux/${this.props.activeAddux._id}`,
            updates,
            {
                headers: {
                    'x-auth': this.props.token
                }
            }
        )
        .then((response) => {
            console.log("INPUT SAVED");
            console.log(response);
        })
        .catch((e) => {
            console.log("COULDN'T SAVE INPUT");
            console.log(e);
        });
    });

    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({text}));
        this.saveText();
    }

    render() {
        return (
            <div className="column__content">
                <p className="column__question">
                    {this.props.prompt}
                </p>

                {accordionSize[this.props.category] > 1 ? (<Accordion category={this.props.category} />) : (<textarea maxLength='50' className='addux-textarea addux-textarea--single' onChange={this.onTextChange} value={this.state.text}></textarea>)}
                <CommentsForm  key={`${this.props.category}_comments`} category={this.props.category}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        activeAddux: state.addux[state.addux.active],
        prompt: state.walkthrough[`${ownProps.category}_prompt`]
    }
}

export default connect(mapStateToProps)(ColumnContent);