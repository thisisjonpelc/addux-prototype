import React from "react";

import Column from "./Column";

const Columns = () => (
    
    <main className="main-content">
        <Column category='objective'/>
        <Column category='goals'/>
        <Column category='projects'/>
        <Column category='timelines'/>
        <Column category='projectOwner'/>
        <Column category='resources'/>
        <Column category='progress'/>
    </main>

);

export default Columns;