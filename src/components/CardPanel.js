import React from 'react';
import Modal from 'react-modal';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';



class CardPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showNewCardModal: false,
            error: '',
            status: ''
        }
    }

    showNewCardModal = () => {
        console.log('Showing Modal');
        this.setState(() => ({showNewCardModal: true}));
    }

    handleCloseModal = () => {
        this.setState(() => ({showNewCardModal: false}));
    }

    onCardSubmit = () => {
        this.props.stripe.createToken()
        .then((response) => {

            if(response.error){
                this.setState(() => ({error: response.error.message}));
            }
            else{

                axios.post('/users/me/card', {
                    token:response.token.id,
                },
                {
                    headers: {
                        'x-auth': this.props.token
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.setState(() => ({
                        error: '',
                        status: 'Your card was succesfully updated'
                    }))
                    this.props.updateCustomer(response.data);
                    console.log('yep');
                })
                .catch((err) => {
                    this.setState(() => ({error: 'Unable to update your card at this time', status: ''}))
                    console.log(err);
                });
            }
        })
    }

    render(){
        return (
            <div className='card-panel'>
                <p className='card-panel__text'><span className='bold'>Current Card:</span> {`${this.props.card.brand} ending in ${this.props.card.last4}`}</p>
                <button className='btn btn--small card-panel__button btn--danger' onClick={this.showNewCardModal}>Change Card</button>

                <Modal
                        style = {{
                            overlay: {
                                zIndex: 201
                            },
                            content:{
                                top:'50%',
                                left:'50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth:'30rem',
                                height:'16rem'
                            }
                        }}
                        isOpen={this.state.showNewCardModal}
                        contentLabel='Select Your New Card'
                        onRequestClose={this.handleCloseModal}
                        shouldCloseOnOverlayClick={true}
                    >
                    <div className='card-element'>
                        <CardElement />
                    </div>
                    <button className='btn btn--full-width' onClick={this.onCardSubmit}>Update Your Credit Card</button>
                    {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                    {this.state.status && <p className='alert alert--success'>{this.state.status}</p>}
                </Modal>
            </div>
        );
    }
}

export default injectStripe(CardPanel);