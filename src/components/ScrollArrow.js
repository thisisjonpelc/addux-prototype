import React from 'react';

const ScrollArrow = (props) => {
    return (
        <div id={`scroll-${props.direction}`} className={`scroll-button scroll-button--${props.direction}`} onClick={props.onArrowClick}>
            <svg className={`scroll-button__icon scroll-button__icon--${props.direction}`}>
                <use href="img/sprite.svg#icon-chevron-right-solid"></use>
            </svg>
        </div>
    );
}

export default ScrollArrow;