import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const SharePage = (props) => {

    const shareURL = `${window.location.href}share/${props.activeAddux._id}`;
    const commentURL = `${window.location.href}comment/${props.activeAddux._id}`;

    //<button className='app-overlay__close' onClick={props.changeShareActive}>Close</button>

    return (
        <div className={`app-overlay ${props.hidden && 'hidden'}`}>
            <svg onClick={props.changeShareActive} className='app-overlay__close'>
                <use href='img/sprite.svg#icon-close'></use>    
            </svg>
            <div><p>Use this link to share a copy of this addux without comments: {shareURL}</p></div>
            <CopyToClipboard text={shareURL}
                onCopy={() => {console.log('Copied!')}}>
                <span style={{border: '1px solid black'}}>Copy to clipboard</span>
            </CopyToClipboard>
            <div><p>Use this link to share a copy of this addux with comments: {commentURL}</p></div>
            <CopyToClipboard text={commentURL}
                onCopy={() => {console.log('Copied!')}}>
                <span style={{border: '1px solid black'}}>Copy to clipboard</span>
            </CopyToClipboard>
        </div>
    );
}

export default SharePage;