import React from 'react';


const AppOverlay = (props) => {

    //console.log(props);

    const preventClose = (e) => {
        console.log('CLICKED CONTENT!');
        e.stopPropagation();
    }

    return (
        <div onClick={props.onRequestClose} className={`app-overlay ${props.isOpen ? '' : 'hidden'}`}>
            
            <div onClick={preventClose} className={'app-overlay__content'}>
                <svg onClick={props.onRequestClose} className='app-overlay__close'>
                    <use xlinkHref='img/sprite.svg#icon-close'></use>    
                </svg>
                {props.children}    
            </div>
            
        </div>
    );

}

export default AppOverlay;