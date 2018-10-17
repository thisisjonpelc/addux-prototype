import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class SharePage extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            noCommentsCopied: false,
            withCommentsCopies: false
        }
    }

    render(){
        const shareURL = `${window.location.href}share/${this.props.activeAddux._id}`;
        const commentURL = `${window.location.href}comment/${this.props.activeAddux._id}`;

        //<button className='app-overlay__close' onClick={props.changeShareActive}>Close</button>

        return (
            <div className='share-page'>
                <h1 className='primary-heading'>Share Your Addux</h1>
                
                <div className='share-page__box'>
                    <p className='share-page__text'>Use this link to share a copy of this addux without comments: <input type='text' value={shareURL} readOnly={true}/></p>
                    <CopyToClipboard text={shareURL}
                        onCopy={() => {this.setState(() => { return {noCommentsCopied:true, withCommentsCopied:false}})}}>
                        <span className='btn btn--full-width share-page__button'>Copy to clipboard</span>
                    </CopyToClipboard>
                    <p className={`alert alert--success share-page__alert ${this.state.noCommentsCopied ? 'share-page__alert--reveal' : ''}`}>Link Copied to Clipboard!</p>
                </div>
                <div className='share-page__box'>
                    <p className='share-page__text'>Use this link to share a copy of this addux with comments:  <input type='text' value={commentURL} readOnly={true}/></p>
                    <CopyToClipboard text={commentURL}
                        onCopy={() => {this.setState(() => { return {noCommentsCopied:false, withCommentsCopied:true}})}}>
                        <span className='btn btn--full-width share-page__button'>Copy to clipboard</span>
                    </CopyToClipboard>
                    <p className={`alert alert--success share-page__alert ${this.state.withCommentsCopied ? 'share-page__alert--reveal' : ''}`}>Link Copied to Clipboard!</p>
                </div>
            </div>
        );
    }
}

export default SharePage;