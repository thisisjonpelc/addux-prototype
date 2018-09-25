import React from "react";
import {connect} from "react-redux";
import {debounce} from "throttle-debounce";
import axios from "axios";

import {editComments} from "./../actions/addux";

class CommentsForm extends React.Component{

    constructor(props){
        super(props);

        //console.log(props);
        console.log(props.comment);
        console.log(props.comment.text);

        this.state = {
            comments:  ""
        }
    }

    saveComments = debounce(1000, () => {
        console.log('SAVING COMMENT');
        console.log(this.props.comment);
        console.log(this.props.comment._id);
        //console.log(`/comments/${this.props.comment._id.toHexString()}`);

        const updates = {
            text: this.state.comments
        }

        axios.patch(
            `/comments/${this.props.comment._id}`,
            updates)
        .then((response) => {
            console.log("COMMENT SAVED");
            console.log(response);
            const upDateObj = {};
            upDateObj[`${this.props.category}_comments`] = this.state.comments;

            this.props.editComments(this.props.active, `${this.props.category}_comments`, this.state.comments);
        })
        .catch((e) => {
            console.log("COULDN'T SAVE COMMENT");
            console.log(e);
        });
    });

    onCommentsChange = (e) => {
        const comments = e.target.value;
        this.setState(() => ({comments}));
        this.saveComments();
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("oldProps", this.props);
    //     console.log("nextProps", nextProps);
    //     console.log("oldState", this.state);
    //     console.log("nextState", nextState);

    //     if(this.props.active !== nextProps.active){
    //         console.log("NOT THE SAME!");
    //     }

    //     return true;
    // }

    render(){

        //console.log("RENDERING");

        return (
            <div className="comments-form">
                <span className="comments-form__label">Comments:</span>
                <textarea 
                    className="comments-form__comments" 
                    placeholder="Comments go here"
                    value={this.props.comment.text || this.state.comments}
                    onChange={this.onCommentsChange}>
                </textarea>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    // console.log(`${ownProps.category}_comments`);
    // console.log(state.addux);
    // console.log(state.addux.active);
    // console.log(state.addux[state.addux.active]);

    return {
        comment: state.addux[state.addux.active][`${ownProps.category}_comments`],
        active: state.addux.active
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editComments: (activeAddux, updates, text) => dispatch(editComments(activeAddux, updates, text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);