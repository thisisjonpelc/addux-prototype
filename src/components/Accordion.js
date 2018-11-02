import React from "react";

import AccordionItem from "./AccordionItem";

import {accordionSize} from './../constants/constants';

class Accordion extends React.Component{
    constructor(props){
        super(props);

        console.log(props);

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

        for(let i = 1; i<this.props.size+1; i++){
            //console.log(`${this.props.activeAddux._id}-${i}-${this.props.openFields[i-1]}`);
            result[i] = <AccordionItem 
                            linked={this.props.linked}
                            key={`${this.props.activeAddux._id}-${i}-${this.props.openFields[i-1]}`} 
                            category={this.props.category} 
                            number={i}
                            openFields={this.props.openFields}  
                            onCheckChange={this.props.onCheckChange} 
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