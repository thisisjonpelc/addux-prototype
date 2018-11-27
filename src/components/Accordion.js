import React from "react";

import AccordionItem from "./AccordionItem";

import {accordionSize} from './../constants/constants';

class Accordion extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            open: -1
        }
    }

    changeOpenItem = (num) => {

        const newOpen = num === this.state.open ? -1 : num;

        this.setState({
            open:newOpen
        });
    }

    render() {

        let result = []        

        for(let i = 1; i<this.props.size+1; i++){
            result[i] = <AccordionItem 
                            linked={this.props.linked}
                            key={`${this.props.activeAddux._id}-${i}-${this.props.openFields[i-1]}`} 
                            category={this.props.category} 
                            number={i}
                            openFields={this.props.openFields}  
                            onCheckChange={this.props.onCheckChange} 
                            onLabelClick={this.onLabelClick} 
                            readOnly={this.props.readOnly}
                            activeAddux={this.props.activeAddux}
                            />
        }

        return (
            <div className="accordion">
                {result}
            </div>
        );

    }

}

export default Accordion;