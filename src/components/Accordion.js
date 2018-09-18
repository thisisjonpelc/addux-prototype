import React from "react";

import AccordionItem from "./AccordionItem";

import {accordionSize} from './../constants/constants';

const Accordion = ({category}) => {
    
    let result = []

    for(let i = 1; i<accordionSize[category]+1; i++){
        result[i] = <AccordionItem key={i} category={category} number={i}/>
    }

    //return result;

    return (
        <div className="accordion">
            {result}
        </div>
    );
}

export default Accordion;