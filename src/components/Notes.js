import React from 'react';
import RichTextEditor from 'react-rte';

class Notes extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value: RichTextEditor.createEmptyValue()
        }
    }

    onChange = (value) => {
        this.setState({value});
    }

    render() {
        return (
            <div className='notes'>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }

}

export default Notes;