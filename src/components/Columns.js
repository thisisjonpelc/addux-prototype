import React from "react";
import { connect } from 'react-redux';
import $ from 'jquery';

import Column from "./Column";
import EmptyPage from './EmptyPage';
import ObjectiveTextArea from './ObjectiveTextArea';
import ColumnHeader from './ColumnHeader';
import CommentsForm from './CommentsForm';
import Accordion from './Accordion';

class Columns extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCol1Syncing: false,
      isCol2Syncing: false,
      isCol3Syncing: false,
      isCol4Syncing: false,
      isCol5Syncing: false
    }
  }

  onGoalsCheckChange = (num, target) => {


    const accordion = document.querySelector('.accordion');

    const checkbox = accordion.childNodes[num - 1].firstChild;

    if (checkbox === target & checkbox.checked === true) {
      accordion.childNodes[num - 1].childNodes[2].firstChild.focus();
    }
  }

  onCheckChange = (num, target) => {

    const accordions = document.querySelectorAll('.accordion');
    let checkbox;

    for (let i = 1; i < accordions.length; i++) {

      checkbox = accordions[i].childNodes[num - 1].firstChild;

      if (checkbox !== target) {
        if (checkbox.checked === true) {
          checkbox.checked = false;
        }
        else {
          checkbox.checked = true;
        }
      }
      else {
        if (checkbox.checked === true) {
          accordions[i].childNodes[num - 1].childNodes[2].firstChild.focus();
        }
      }

    }
  }

  projectColumnScroll = (e) => {
    const accordions = document.querySelectorAll('.accordion');
    
    if(!this.state.isCol1Syncing){
      this.setState(() => {
        return {
          isCol2Syncing: true,
          isCol3Syncing:true,
          isCol4Syncing:true,
          isCol5Syncing:true
        }
      });

      for(let i = 1; i < accordions.length; i++){
        if(accordions[i] !== e.target){
          accordions[i].scrollTop = e.target.scrollTop;
        }
      }
    }

    this.setState(() => {
      return {
        isCol1Syncing:false
      }
    });
  }

  timelinesColumnScroll = (e) => {
    const accordions = document.querySelectorAll('.accordion');
    
    if(!this.state.isCol2Syncing){
      this.setState(() => {
        return {
          isCol1Syncing: true,
          isCol3Syncing:true,
          isCol4Syncing:true,
          isCol5Syncing:true
        }
      });

      for(let i = 1; i < accordions.length; i++){
        if(accordions[i] !== e.target){
          accordions[i].scrollTop = e.target.scrollTop;
        }
      }
    }

    this.setState(() => {
      return {
        isCol2Syncing:false
      }
    });
  }

  projectOwnerColumnScroll = (e) => {
    const accordions = document.querySelectorAll('.accordion');
    
    if(!this.state.isCol3Syncing){
      this.setState(() => {
        return {
          isCol1Syncing: true,
          isCol2Syncing:true,
          isCol4Syncing:true,
          isCol5Syncing:true
        }
      });

      for(let i = 1; i < accordions.length; i++){
        if(accordions[i] !== e.target){
          accordions[i].scrollTop = e.target.scrollTop;
        }
      }
    }

    this.setState(() => {
      return {
        isCol3Syncing:false
      }
    });
  }

  resourcesColumnScroll = (e) => {
    const accordions = document.querySelectorAll('.accordion');
    
    if(!this.state.isCol4Syncing){
      this.setState(() => {
        return {
          isCol1Syncing: true,
          isCol2Syncing:true,
          isCol3Syncing:true,
          isCol5Syncing:true
        }
      });

      for(let i = 1; i < accordions.length; i++){
        if(accordions[i] !== e.target){
          accordions[i].scrollTop = e.target.scrollTop;
        }
      }
    }

    this.setState(() => {
      return {
        isCol4Syncing:false
      }
    });
  }

  progressColumnScroll = (e) => {
    const accordions = document.querySelectorAll('.accordion');
    
    if(!this.state.isCol5Syncing){
      this.setState(() => {
        return {
          isCol1Syncing: true,
          isCol2Syncing:true,
          isCol3Syncing:true,
          isCol4Syncing:true
        }
      });

      for(let i = 1; i < accordions.length; i++){
        if(accordions[i] !== e.target){
          accordions[i].scrollTop = e.target.scrollTop;
        }
      }
    }

    this.setState(() => {
      return {
        isCol5Syncing:false
      }
    });
  }

  render() {

    return (
      this.props.empty ?
        (
          <main className='main-content'>
            <EmptyPage showCreateModal={this.props.showCreateModal} />
          </main>
        )
        :
        (
          <main className='main-content'>
            <div className="column">

              <ColumnHeader
                category={'objective'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className="column__content">
                <p className="column__question">
                  {this.props.walkthrough[`objective_prompt`]}
                </p>

                <div className='objective-block'>
                  <p className='objective-block__label'>Objective</p>
                  <ObjectiveTextArea
                    key={`${this.props.activeAddux._id}-obj`}
                    category={'objective'}
                    activeAddux={this.props.activeAddux}
                    id={this.props.activeAddux._id}
                    readOnly={this.props.readOnly} />
                </div>

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'objective'}
                    comment={this.props.activeAddux[`objective_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }

              </div>
            </div>

            <div className='column'>

              <ColumnHeader
                category={'goals'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className='column__content'>
                <p className='column__question'>
                  {this.props.walkthrough['goals_prompt']}
                </p>


                <Accordion
                  size={3}
                  linked={this.props.linked}
                  onCheckChange={this.onGoalsCheckChange}
                  openFields={this.state.openFields}
                  activeAddux={this.props.activeAddux}
                  category={'goals'}
                  readOnly={this.props.readOnly}
                />

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'goals'}
                    comment={this.props.activeAddux[`goals_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }
              </div>
            </div>

            <div className='column'>

              <ColumnHeader
                category={'projects'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className='column__content'>
                <p className='column__question'>
                  {this.props.walkthrough['projects_prompt']}
                </p>


                <Accordion
                  size={9}
                  linked={true}
                  onCheckChange={this.onCheckChange}
                  openFields={this.state.openFields}
                  activeAddux={this.props.activeAddux}
                  category={'projects'}
                  readOnly={this.props.readOnly}
                  onScroll={this.projectColumnScroll}
                />

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'projects'}
                    comment={this.props.activeAddux[`projects_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }
              </div>
            </div>

            <div className='column'>

              <ColumnHeader
                category={'timelines'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className='column__content'>
                <p className='column__question'>
                  {this.props.walkthrough['timelines_prompt']}
                </p>


                <Accordion
                  size={9}
                  linked={true}
                  onCheckChange={this.onCheckChange}
                  openFields={this.state.openFields}
                  activeAddux={this.props.activeAddux}
                  category={'timelines'}
                  readOnly={this.props.readOnly}
                  onScroll={this.timelinesColumnScroll}
                />

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'timelines'}
                    comment={this.props.activeAddux[`timelines_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }
              </div>
            </div>

            <div className='column'>

              <ColumnHeader
                category={'projectOwner'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className='column__content'>
                <p className='column__question'>
                  {this.props.walkthrough['projectOwner_prompt']}
                </p>


                <Accordion
                  size={9}
                  linked={true}
                  onCheckChange={this.onCheckChange}
                  openFields={this.state.openFields}
                  activeAddux={this.props.activeAddux}
                  category={'projectOwner'}
                  readOnly={this.props.readOnly}
                  onScroll={this.projectOwnerColumnScroll}
                />

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'projectOwner'}
                    comment={this.props.activeAddux[`projectOwner_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }
              </div>
            </div>

            <div className='column'>

              <ColumnHeader
                category={'resources'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className='column__content'>
                <p className='column__question'>
                  {this.props.walkthrough['resources_prompt']}
                </p>


                <Accordion
                  size={9}
                  linked={true}
                  onCheckChange={this.onCheckChange}
                  openFields={this.state.openFields}
                  activeAddux={this.props.activeAddux}
                  category={'resources'}
                  readOnly={this.props.readOnly}
                  onScroll={this.resourcesColumnScroll}
                />

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'resources'}
                    comment={this.props.activeAddux[`resources_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }
              </div>
            </div>

            <div className='column'>

              <ColumnHeader
                category={'progress'}
                walkthrough={this.props.walkthrough}
                showVideos={!this.props.readOnly}
              />

              <div className='column__content'>
                <p className='column__question'>
                  {this.props.walkthrough['progress_prompt']}
                </p>


                <Accordion
                  size={9}
                  linked={true}
                  onCheckChange={this.onCheckChange}
                  openFields={this.state.openFields}
                  activeAddux={this.props.activeAddux}
                  category={'progress'}
                  readOnly={this.props.readOnly}
                  onScroll={this.progressColumnScroll}
                />

                {
                  this.props.showComments
                  &&
                  <CommentsForm
                    key={`${this.props.activeAddux._id}-comments`}
                    category={'progress'}
                    comment={this.props.activeAddux[`progress_comments`]}
                    active={this.props.activeAddux._id}
                  />
                }
              </div>
            </div>

          </main>
        )
    );
  }
}

export default Columns;