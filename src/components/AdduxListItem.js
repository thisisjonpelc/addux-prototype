import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {deleteAddux} from './../actions/addux';

const AdduxListItem = (props) => {
    
    const onDeleteClick = (e) => {
        e.stopPropagation();

        if(confirm(`Are you sure you want to delete ${props.name}?`)){
            console.log('WANT TO DELETE ' + props.id);
            axios.delete(`/addux/${props.id}`,
                {headers: {'x-auth': props.token}})
            .then((response) => {
                console.log('Deleted Addux!');
                console.log(response);
                props.deleteAddux(props.id);
            })
            .catch((err) => {
                console.log('Failed to delete addux');
                console.log(err);
            });
            

        }
        else{
            console.log('JUST KIDDING!');
        }
    }


    return (

    <div className={`addux-list-item ${props.active && 'addux-list-item--active'}`} onClick={props.onClick}>
        <div className='addux-list-item__name'>
            {props.name}
        </div>
        
        <svg onClick={onDeleteClick}className='addux-list-item__delete'>
            <use xlinkHref="img/sprite.svg#icon-trash-o"></use>
        </svg>
    </div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAddux: (id) => dispatch(deleteAddux(id))
    }
}

export default connect(null, mapDispatchToProps)(AdduxListItem);