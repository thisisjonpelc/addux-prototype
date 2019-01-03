import React from 'react';
import {connect} from 'react-redux';
import {debounce} from 'throttle-debounce';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {deleteAddux, editAddux} from './../actions/addux';
import {unsubscribe} from './../actions/subscription';
import {logout} from './../actions/auth';

class AdduxListItem extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            nameEdit:false,
            name:props.name,
            nameChanged:false
        }
    }

    onDeleteClick = (e) => {
        e.stopPropagation();

        if(confirm(`Are you sure you want to delete ${this.props.name}?`)){
            axios.delete(`/addux/${this.props.id}`,
                {headers: {'x-auth': this.props.token}})
            .then((response) => {
                this.props.deleteAddux(this.props.id);
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
            });
        }
    }

    onEditClick = (e) => {
        e.stopPropagation();

        this.setState({nameEdit:true});
    }

    onDoneClick = (e) => {
        e.stopPropagation();

        if(this.state.nameChanged){
            this.saveName(this.state.name);
        }
 
        this.setState({nameEdit:false, nameChanged:false});
    }

    saveName = (name) => {

        const updates={
            name
        };

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
                this.props.editAddux(this.props.id, updates);
            })
            .catch((error) => {

                console.log(error);

                if (error.response.status === 402) {
                    this.props.unsubscribe();
                    history.push('/subscribe');
                }
                else if (error.response.status === 401) {
                    this.props.logout();
                    history.push('/login');
                }
            });
    };

    onNameChange = (e) => {
        const name = e.target.value;

        this.setState({name, nameChanged:true});
    };

    render() {

        if(this.state.nameEdit){
            return (
                <div className={`addux-list-item ${this.props.active ? 'addux-list-item--active' : ''}`}>
                
                    <input onChange={this.onNameChange} className='addux-list-item__name addux-list-item__name--input' autoFocus={true} type='text' readOnly={!this.state.nameEdit} value={this.state.name} />
                
                    <button onClick={this.onDoneClick} className='btn btn--tiny addux-list-item__button'>Done</button>

                </div>
            );
        }
        else{
            return (
                <div className={`addux-list-item ${this.props.active ? 'addux-list-item--active' : ''}`} onClick={this.props.onClick}>
                    <div className="addux-list-item__name addux-list-item__name--display">{this.state.name}</div>
            
                    <svg onClick={this.onEditClick} className='addux-list-item__icon'>
                        <use xlinkHref="img/sprite.svg#icon-pencil-alt-solid"></use>
                    </svg>
                    <svg onClick={this.onDeleteClick} className='addux-list-item__icon addux-list-item__icon--delete'>
                        <use xlinkHref="img/sprite.svg#icon-trash-o"></use>
                    </svg>
                </div>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates)),
        deleteAddux: (id) => dispatch(deleteAddux(id)),
        unsubscribe: () => dispatch(unsubscribe()),
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(AdduxListItem);