import React from "react";

import Accordion from "./Accordion";
import CommentsForm from "./CommentsForm";

//import {accordionItems} from "./../constants/constants";

const ColumnContent = ({category}) => (
    <div className="column__content">
        <p className="column__question">
            Question or Subtile goes here.
        </p>

        <Accordion category={category}/>
        <CommentsForm />
    </div>
);

export default ColumnContent;