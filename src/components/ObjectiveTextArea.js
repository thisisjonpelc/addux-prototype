import React from "react";
import {connect} from "react-redux";

import {debounce} from 'throttle-debounce';
import axios from 'axios';

import {editAddux} from './../actions/addux';

class ObjectiveTextArea extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            text: this.props.activeAddux[this.props.category]
        }
    }

    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({text}));
        this.saveText(text);
    }

    saveText = debounce(1000, (text) => {
        console.log('SAVING INPUT');
        //console.log(this.props.comment);
        //console.log(this.props.comment._id);
        //console.log(`/comments/${this.props.comment._id.toHexString()}`);

        const updates = {};

        updates[`${this.props.category}`] = text;

        console.log(updates);

        axios.patch(
            `/addux/${this.props.id}`,
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

            this.props.editAddux(this.props.activeAddux._id, updates);

        })
        .catch((e) => {
            console.log("COULDN'T SAVE INPUT");
            console.log(e);
        });
    });

    render(){
        return (
            <textarea maxLength='50' className='addux-textarea addux-textarea--single' onChange={this.onTextChange} value={this.state.text}></textarea>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        activeAddux: state.addux[state.addux.active]
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveTextArea);