import React from 'react';
import {connect} from 'react-redux';
import RichTextEditor from 'react-rte';
import {debounce} from 'throttle-debounce';
import axios from 'axios';

import {editAddux} from './../actions/addux';

class Notes extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value: RichTextEditor.createValueFromString((props.activeAddux.notes ? props.activeAddux.notes : ''), 'html'),
            html: props.activeAddux.notes
        }
    }

    saveNotes = debounce(1000, (notes) => {

        const updates = {
            notes
        }

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
            console.log('Notes Saved');
            console.log(response);
            this.props.editAddux(this.props.activeAddux._id, updates);
        })
        .catch((e) => {
            console.log('Could not save notes');
            console.log(e);
        });

    });

    onChange = (value) => {
        const html = value.toString('html');

        //console.log(html, '?', this.state.html);

        const htmlChanged = this.state.html !== html;

        this.setState({value, html});

        if(htmlChanged){
            console.log('HTML has changed');
            this.saveNotes(html)
        }

       // this.setState({value});
        console.log(value.toString('html'));
        //this.saveNotes(value.toString('html'));        
    }

    render() {
        return (
            <div className={`notes ${this.props.notesActive && 'notes--active'}`}>
                <svg onClick={this.props.changeNotesActive} className='notes__close'>
                    <use xlinkHref='img/sprite.svg#icon-close'></use>    
                </svg>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        editAddux: (activeAddux, updates) => dispatch(editAddux(activeAddux, updates))
    }
    
}

export default connect(null, mapDispatchToProps)(Notes);