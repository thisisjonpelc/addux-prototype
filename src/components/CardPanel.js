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
                <h1>Payment Info</h1>
                <p>Current Card: {`${this.props.card.brand} ending in ${this.props.card.last4}`}</p>
                <button onClick={this.showNewCardModal}>Change Card</button>

                <Modal
                        style = {{
                            overlay: {
                                zIndex: 201
                            },
                            content:{
                                top:'50%',
                                left:'50%',
                                transform: 'translate(-50%, -50%)',
                                width:'30rem',
                                height:'10rem'
                            }
                        }}
                        isOpen={this.state.showNewCardModal}
                        contentLabel='Select Your New Card'
                        onRequestClose={this.handleCloseModal}
                        shouldCloseOnOverlayClick={true}
                    >
                    {this.state.error && <p>{this.state.error}</p>}
                    {this.state.status && <p>{this.state.status}</p>}
                    <CardElement />
                    <button onClick={this.onCardSubmit}>Update Your Credit Card</button>
                </Modal>
            </div>
        );
    }
}

export default injectStripe(CardPanel);