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
        //console.log("CHANGING OPEN ITEM");

        const newOpen = num === this.state.open ? -1 : num;

        //console.log("NEW OPEN: ", newOpen);

        this.setState({
            open:newOpen
        });
    }

    render() {

        let result = []

        

        for(let i = 1; i<accordionSize[this.props.category]+1; i++){
            //console.log(`${this.props.activeAddux._id}-${i}-${this.props.openFields[i-1]}`);
            result[i] = <AccordionItem 
                            key={`${this.props.activeAddux._id}-${i}-${this.props.openFields[i-1]}`} 
                            category={this.props.category} 
                            number={i}
                            openFields={this.props.openFields}  
                            changeOpenItem={this.props.onCheckChange} 
                            onLabelClick={this.onLabelClick} 
                            readOnly={this.props.readOnly}
                            activeAddux={this.props.activeAddux}/>
        }

        return (
            <div className="accordion">
                {result}
            </div>
        );

    }

}

export default Accordion;