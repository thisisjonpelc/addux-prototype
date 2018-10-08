import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";

const Column = ({category, readOnly, showComments, activeAddux, walkthrough}) => (
    <div className="column">
        <ColumnHeader category={category} walkthrough={walkthrough}/>
        <ColumnContent category={category} readOnly={readOnly} showComments={showComments} walkthrough={walkthrough} activeAddux={activeAddux}/>
    </div>
);

export default Column