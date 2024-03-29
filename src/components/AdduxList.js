import React from 'react';
import {connect} from "react-redux";

import {setActive} from './../actions/addux';

import AdduxListItem from './AdduxListItem';

const AdduxList = (props) => {

    const AdduxItems = [];
    const clickMethods = [];

    for(let key in props.addux){



        if(key !== 'active'){
            AdduxItems.push(
                <AdduxListItem key={`${key}_${props.addux[key].name}`} id={key} token={props.token} changeListActive={props.changeListActive} active={props.addux.active === key} {...props.addux[key]} onClick={() => {if(props.addux.active !== key){props.setActive(key); props.changeListActive();}}}/>
            );
        }
    }

    return(

        <div className={`addux-list ${props.listActive && 'addux-list--active'}`}>
            <svg onClick={props.changeListActive} className='addux-list__close'>
                <use xlinkHref='img/sprite.svg#icon-close'></use>    
            </svg>

            {props.empty ? 
                <h1> You don't have an addux </h1>
                :
                (
                    <div className='addux-list__list'>
                        {AdduxItems}        
                    </div>
                )
            }

        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        addux:state.addux,
        token:state.auth.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActive: (id) => (dispatch(setActive(id)))
    }        
};

export default connect(mapStateToProps, mapDispatchToProps)(AdduxList);