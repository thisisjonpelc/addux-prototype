import React from 'react';

import {labels} from '../constants/constants';

const AccordionItem = (props) => {
    
    console.log(props);
    
    return (
        <div className='accordion__item'>
            <input id={`${props.category}-${props.number}`} type='checkbox' />
            <label className='accordion__label' htmlFor={`${props.category}-${props.number}`}>
                <span>{`${labels[props.category]} ${props.number}`}</span>
                <svg className='accordion__icon'>
                    <use href='img/sprite.svg#icon-chevron-down-solid'></use>
                </svg>
            </label>
            <div class='accordion__text'>
                <textarea maxLength='50' className='addux-textarea'></textarea>
            </div> 
        </div>
    );
}


export default AccordionItem;