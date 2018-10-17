import React from "react";

import Column from "./Column";

class Columns extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      openFields : [true, false, false, false, false, false, false, false, false]
    }
  }

  onCheckChange = (num) => {
    console.log('IN ON CHECK CHANGE');
    console.log('num is:', num);

    this.setState((prevState) => {
      
      const newOpenFields = prevState.openFields;

      newOpenFields[num-1] = !newOpenFields[num-1];

      console.log(newOpenFields);

      return {
        openFields: newOpenFields
      }
    });
  }

  render(){

    console.log('STATE IS: ', this.state);

    return (
      this.props.empty ? 
          (
            <main className='main-content'>  
              <h1>You have no Adduxes!</h1>
            </main>
          )
          :
          (
              <main className='main-content'>
                <Column category='objective' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                <Column category='goals' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                <Column category='projects' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                <Column category='timelines' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                <Column category='projectOwner' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                <Column category='resources' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                <Column category='progress' onCheckChange={this.onCheckChange} openFields={this.state.openFields} readOnly={this.props.readOnly} showComments={this.props.showComments} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
              </main>
          )
    );
  }
}

export default Columns;