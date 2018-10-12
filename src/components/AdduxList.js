import React from 'react';
import {connect} from "react-redux";

import {setActive} from './../actions/addux';

import AdduxListItem from './AdduxListItem';

const AdduxList = (props) => {

    const AdduxItems = [];
    const clickMethods = [];

    for(let key in props.addux){

        //console.log(props.addux.active);
        //console.log(key);

        //() => {console.log("CLICKED!"); ;

        if(key !== 'active'){
            AdduxItems.push(
                <AdduxListItem key={key} active={props.addux.active === key} {...props.addux[key]} onClick={() => {if(props.addux.active !== key){props.setActive(key)}}}/>
            );
        }
    }

    //console.log(AdduxItems);

    return(

        <div className={`addux-list ${props.listActive && 'addux-list--active'}`}>
            <svg onClick={props.changeListActive} className='addux-list__close'>
                <use xlinkHref='img/sprite.svg#icon-close'></use>    
            </svg>

            {props.empty ? 
                <h1> You don't have any Adduxes! </h1>
                :
            AdduxItems}

        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        addux:state.addux
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActive: (id) => (dispatch(setActive(id)))
    }        
};

export default connect(mapStateToProps, mapDispatchToProps)(AdduxList);