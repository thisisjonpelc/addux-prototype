import React from 'react';
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';

import {unsubscribe} from './../actions/subscription';
import {logout} from './../actions/auth';

class SharePage extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            noCommentsCopied: false,
            withCommentsCopies: false,
            creatingPdf:false
        }
    }

    onPdfClick = () => {

        //this.setState(() => ({creatingPdf:true}));

        axios.post(
            '/addux/csv',
            {
                firstName:this.props.auth.firstName,
                lastName:this.props.auth.lastName,
                email:this.props.auth.email,
                name:this.props.activeAddux.name,
                activeAddux:this.props.activeAddux._id
            },
            {
                headers: {
                    'x-auth': this.props.token
                }
            }
        )
        .then((response) => {
            alert('Your PDF is being created and will be delivered to your email.');
            //this.setState(() => ({creatingPdf: false}));
        })
        .catch((err) => {

            if(err.response.status === 402){
                this.props.unsubscribe();
                history.push('/subscribe');
            }
            else if(err.response.status === 401){
                this.props.logout();
                history.push('/login');
            }
            else{
                alert('Unable to request PDF at this time');
                //this.setState(() => ({creatingPdf:false}));
            }
        });

    }

    //PDF button to remove later
    //<button className='btn btn--width-200 share-page__pdf-buton' onClick={this.onPdfClick} disabled={this.state.creatingPdf}>{this.state.creatingPdf ? (<img className='btn__loading' src='img/loading.gif' />) : ('Download as PDF')}</button>

    render(){
        const shareURL = `${window.location.href}share/${this.props.activeAddux._id}`;
        const commentURL = `${window.location.href}comment/${this.props.activeAddux._id}`;

        //<button className='app-overlay__close' onClick={props.changeShareActive}>Close</button>

        return (
            <div className='share-page'>
                <h1 className='primary-heading'>Share Your addux</h1>
                
                <div className='share-page__box'>
                    <p className='share-page__text'>Use this link to share a copy of this addux <span className='underline'>without</span> comments: <input type='text' value={shareURL} readOnly={true}/></p>
                    <CopyToClipboard text={shareURL}
                        onCopy={() => {this.setState(() => { return {noCommentsCopied:true, withCommentsCopied:false}})}}>
                        <span className='btn btn--full-width share-page__button'>Copy to clipboard</span>
                    </CopyToClipboard>
                    <p className={`alert alert--success share-page__alert ${this.state.noCommentsCopied ? 'share-page__alert--reveal' : ''}`}>Link Copied to Clipboard!</p>
                </div>
                <div className='share-page__box'>
                    <p className='share-page__text'>Use this link to share a copy of this addux <span className='underline'>with</span> comments:  <input type='text' value={commentURL} readOnly={true}/></p>
                    <CopyToClipboard text={commentURL}
                        onCopy={() => {this.setState(() => { return {noCommentsCopied:false, withCommentsCopied:true}})}}>
                        <span className='btn btn--full-width share-page__button'>Copy to clipboard</span>
                    </CopyToClipboard>
                    <p className={`alert alert--success share-page__alert ${this.state.withCommentsCopied ? 'share-page__alert--reveal' : ''}`}>Link Copied to Clipboard!</p>    
                </div>
                <button className='btn btn--width-200 share-page__pdf-buton' onClick={this.onPdfClick} disabled={this.state.creatingPdf}>{this.state.creatingPdf ? (<img className='btn__loading' src='img/loading.gif' />) : ('Get My PDF')}</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        activeAddux : state.addux[state.addux.active],
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        unsubscribe: () => dispatch(unsubscribe()),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePage);

//export default SharePage;