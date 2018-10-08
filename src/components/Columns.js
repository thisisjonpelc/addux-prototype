import React from "react";

import Column from "./Column";

const Columns = (props) => (
        props.empty ? 
            (
              <main className='main-content'>  
                <h1>You have no Adduxes!</h1>
              </main>
            )
            :
            (
                <main className='main-content'>
                <Column category='objective'/>
                <Column category='goals'/>
                <Column category='projects'/>
                <Column category='timelines'/>
                <Column category='projectOwner'/>
                <Column category='resources'/>
                <Column category='progress'/>
                </main>
            )
);

export default Columns;