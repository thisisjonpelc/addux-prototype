import React from "react";
import {connect} from "react-redux";
import {debounce} from "throttle-debounce";
import axios from "axios";

import {editComments} from "./../actions/addux";

import CommentTextArea from './CommentTextArea';

class CommentsForm extends React.Component{

    constructor(props){

       

        super(props);

        this.state = {
             comments:  props.comment.text
        }
    }

    saveComments = debounce(1000, (comments) => {

        const updates = {
            text: comments
        }

        axios.patch(
            `/comments/${this.props.comment._id}`,
            updates)
        .then((response) => {
            this.props.editComments(this.props.active, `${this.props.category}_comments`, comments);
        })
        .catch((e) => {
            
        });
    });

    onCommentsChange = (e) => {
        const comments = e.target.value;
        this.setState(() => ({comments}));
        this.saveComments(comments);
    }

    render(){

        return (
            <div className="comments-form">
                <span className="comments-form__label">Comments:</span>
                <textarea 
                    className="comments-form__comments" 
                    placeholder="Comments go here"
                    value={this.state.comments}
                    onChange={this.onCommentsChange}>
                </textarea>                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        //comment: state.addux[state.addux.active][`${ownProps.category}_comments`],
        //active: state.addux.active
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editComments: (activeAddux, updates, text) => dispatch(editComments(activeAddux, updates, text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);