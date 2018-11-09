import React from 'react';
import {connect} from 'react-redux';
import {debounce} from 'throttle-debounce';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {labels} from '../constants/constants';

import {editAddux} from './../actions/addux';
import {unsubscribe} from './../actions/subscription';

class AccordionItem extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            text: props.activeAddux[`${props.category}_${props.number}`] 
        }
    }

    onCheckChange = (e) => {
        if(this.props.linked){
             this.props.onCheckChange(Number(e.target.id.slice(-1)), e.target);
        }
    }

    saveText = debounce(1000, (text) => {

        const updates = {};

        updates[`${this.props.category}_${this.props.number}`] = text;

        axios.patch(
            `/addux/${this.props.activeAddux._id}`,
            updates,
            {
                headers: {
                    'x-auth': this.props.token
                }
            }
        )
        .then((response) => {
            this.props.editAddux(this.props.activeAddux._id, updates);
        })
        .catch((e) => {
            if(e.response.status === 402){
                this.props.unsubscribe();
                history.push('/subscribe');
            }
            else{
            }
        });
    });

    onTextChange = (e) => {
            const text = e.target.value;
            this.setState(() => ({text}));
            this.saveText(text);
    }

    render() {
        return (
            <div className='accordion__item'>
                {
                    this.props.linked 
                    ?
                    (
                        <input 
                            id={`${this.props.category}-${this.props.number}`}  
                            type='checkbox'
                            onChange={this.onCheckChange}
                            //checked={this.props.openFields[this.props.number-1]}
                        />
                    )
                    :
                    (
                        <input 
                            id={`${this.props.category}-${this.props.number}`}  
                            type='checkbox'
                        />
                    )
                }

                
                <label className='accordion__label' 
                       htmlFor={`${this.props.category}-${this.props.number}`}
                    >
                    <span>{`${labels[this.props.category]} ${this.props.number}`}</span>
                    <svg className='accordion__icon'>
                        <use xlinkHref='img/sprite.svg#icon-chevron-down-solid'></use>
                    </svg>
                </label>
                <div className='accordion__text'>
                    <textarea 
                        maxLength='50' 
                        className='addux-textarea' 
                        onChange={this.onTextChange} 
                        value={this.state.text}
                        readOnly={this.props.readOnly}>
                    </textarea>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        //activeAddux: state.addux[state.addux.active]
    }
} 

const mapDispatchToProps = (dispatch) => {

    return {
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates)),
        unsubscribe: () => dispatch(unsubscribe())
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AccordionItem);