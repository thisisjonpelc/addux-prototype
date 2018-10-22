import React from 'react';

const EmptyPage = (props) => {
    
    
    return (
        <div className='empty-page'>
            <div className='empty-page__box'>
                <p>You don't have any adduxes!</p>
                <button onClick={props.showCreateModal} className='btn'>Create One!</button>
            </div>
        </div>
    );
}

export default EmptyPage;