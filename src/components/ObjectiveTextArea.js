import React from "react";
import {connect} from "react-redux";

import {debounce} from 'throttle-debounce';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {editAddux} from './../actions/addux';
import {unsubscribe} from './../actions/subscription';
import {logout} from './../actions/auth';

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

        const updates = {};

        updates[`${this.props.category}`] = text;

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

            this.props.editAddux(this.props.activeAddux._id, updates);

        })
        .catch((e) => {
            if(e.response.status === 402){
                this.props.unsubscribe();
                history.push('/subscribe');
            }
            else if(e.response.status === 401){
                console.log('User is not authorized');
                this.props.logout();
                history.push('/login');
            }
            else{
                console.log('Could not save to database!');
            }
        });
    });

    render(){
        return (
            <textarea maxLength='50' className='addux-textarea addux-textarea--single' onChange={this.onTextChange} value={this.state.text} readOnly={this.props.readOnly}></textarea>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        //activeAddux: state.addux[state.addux.active]
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates)),
        unsubscribe: () => dispatch(unsubscribe()),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveTextArea);