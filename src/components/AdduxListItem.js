import React from 'react';
import {connect} from 'react-redux';





const AdduxListItem = (props) => {
    
    return (

    <div className={`addux-list-item ${props.active && 'addux-list-item--active'}`} onClick={props.onClick}>
        <div className='addux-list-item__name'>
            {props.name}
        </div>
        <div className='addux-list-item__delete'>
            DELETE ICON
        </div>
    </div>
    );

}

export default AdduxListItem;