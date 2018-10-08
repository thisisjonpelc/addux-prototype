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
                <Column category='objective' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                <Column category='goals' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                <Column category='projects' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                <Column category='timelines' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                <Column category='projectOwner' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                <Column category='resources' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                <Column category='progress' readOnly={props.readOnly} showComments={props.showComments} activeAddux={props.activeAddux} walkthrough={props.walkthrough}/>
                </main>
            )
);

export default Columns;