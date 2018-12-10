import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {addAddux} from './../actions/addux';
import {unsubscribe} from './../actions/subscription';
import {logout} from './../actions/auth';

class AdduxNameForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            name : props.addux ? props.addux.name : "",
            error: '',
            creating: false
        }
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({name});
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.name){
            this.setState({
                error: 'Your addux must have a name!'
            });
        }
        else{

            this.setState({
                error:'',
                creating:true
            });

            axios.post(
                `/addux`,
                {
                    name: this.state.name
                },
                {
                    headers: {
                        'x-auth': this.props.token
                    }
                })
            .then((response) => {
                this.props.closeModal();
                this.setState({
                    creating:false
                });
                this.props.addAddux(response.data.addux);
                //this.props.setActive(response.data.addux._id);
            })
            .catch((err) => {


                if(err.response.status === 402){
                    this.props.unsubscribe();
                    history.push('/subscribe');
                }
                else if(err.response.status === 401){
                    this.props.logout();
                    history.push('/login');
                }
                else{
                    this.setState({
                        error:'Sorry! Unable to create new addux at this time.',
                        creating:false
                    });
                }
            });
        }
    }

    render() {
        return (
            <div>
                <form className='form form--300' onSubmit={this.onSubmit}>     
                    <div className='form__form-group'>
                        <input className='form__input' type='text' value={this.state.name} onChange={this.onNameChange} placeholder='Name Your addux'/>
                    </div>
                    <button className='btn btn--full-width' disabled={this.state.creating}>{this.state.creating ? (<img className='btn__loading' src='img/loading.gif'/>): (this.props.buttonText)}</button>
                    {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAddux: (addux) => dispatch(addAddux(addux)),
        unsubscribe: () => dispatch(unsubscribe()),
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(AdduxNameForm);