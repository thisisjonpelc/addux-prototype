import React from 'react';

class AdduxNameForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            name : props.addux ? props.addux.name : ""
        }
    }

    onNameChange = (e) => {
        const name = e.target.value;
        console.log(name);
        this.setState({name});
    }

    render() {
        return (
            <form className='form' onSubmit={this.props.onSubmit}>
                
                <div className='form__form-group'>
                    <input className='form__input' type='text' value={this.state.name} onChange={this.onNameChange} placeholder='Name Your Addux'/>
                </div>            
                <button className='btn btn--full-width'>{this.props.buttonText}</button>
            </form>
        );
    }
}

export default AdduxNameForm;