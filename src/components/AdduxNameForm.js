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
        this.setState({name});
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <input type='text' value={this.state.name} onChange={this.onNameChange} placeholder='Name Your Addux'/>
                <button>{this.props.buttonText}</button>
            </form>
        );
    }
}

export default AdduxNameForm;