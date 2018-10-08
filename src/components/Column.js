import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";

const Column = ({category, readOnly, showComments}) => (
    <div className="column">
        <ColumnHeader category={category}/>
        <ColumnContent category={category} readOnly={readOnly} showComments={showComments}/>
    </div>
);

export default Column