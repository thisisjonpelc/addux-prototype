import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";

const Column = ({category, readOnly, showComments, activeAddux, walkthrough, openFields, onCheckChange, linked}) => (
    <div className="column">
        <ColumnHeader category={category} walkthrough={walkthrough} showVideos={!readOnly}/>
        <ColumnContent linked={linked} onCheckChange={onCheckChange} openFields={openFields} category={category} readOnly={readOnly} showComments={showComments} walkthrough={walkthrough} activeAddux={activeAddux}/>
    </div>
);

export default Column