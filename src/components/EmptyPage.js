import React from 'react';

const EmptyPage = (props) => {
    
    
    return (
        <div className='empty-page'>
            <div className='empty-page__box'>
                <p>You don't have an addux</p>
                <button onClick={props.showCreateModal} className='btn'>Create One!</button>
            </div>
        </div>
    );
}

export default EmptyPage;