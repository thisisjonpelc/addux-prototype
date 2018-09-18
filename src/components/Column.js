import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";

const Column = ({category}) => (
    <div className="column">
        <ColumnHeader category={category}/>
        <ColumnContent category={category}/>
    </div>
);

export default Column