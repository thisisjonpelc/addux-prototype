import React from "react";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => {
    return {
        empty: Object.keys(state.addux).length === 0 && state.addux.constructor === Object,
        active: state.addux.active 
    };
}

export default connect(mapStateToProps)(Columns);