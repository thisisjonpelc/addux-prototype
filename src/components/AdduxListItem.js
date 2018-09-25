import React from 'react';
import {connect} from 'react-redux';





const AdduxListItem = (props) => {
    
    return (
        

    <div className={`addux-list__item ${props.active && 'addux-list__item--active'}`} onClick={props.onClick}>
        {props.name}
    </div>
    );

}

export default AdduxListItem;