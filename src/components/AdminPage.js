import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {setWalkthrough} from './../actions/walkthrough';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        console.log(props.walkthrough);

        this.state={
            objective_prompt: props.walkthrough.objective_prompt,
            objective_video: props.walkthrough.objective_video,
            goals_prompt: props.walkthrough.goals_prompt,
            goals_video: props.walkthrough.goals_video,
            projects_prompt: props.walkthrough.projects_prompt,
            projects_video: props.walkthrough.projects_video,
            timelines_prompt: props.walkthrough.timelines_prompt,
            timelines_video: props.walkthrough.timelines_video,
            projectOwner_prompt: props.walkthrough.projectOwner_prompt,
            projectOwner_video: props.walkthrough.projectOwner_video, 
            resources_prompt: props.walkthrough.resources_prompt,
            resources_video: props.walkthrough.resources_video,
            progress_prompt: props.walkthrough.resources_prompt,
            progress_video: props.walkthrough.progress_video,
            error: '',
            success: ''         
        }
    }

    objectivePromptChange = (e) => {
        const objective_prompt = e.target.value;

        this.setState(() => ({objective_prompt}));
    }

    objectiveVideoChange = (e) => {
        const objective_video = e.target.value;
        this.setState(() => ({objective_video}));
    }

    goalsPromptChange = (e) => {
        const goals_prompt = e.target.value;

        this.setState(() => ({goals_prompt}));
    }

    goalsVideoChange = (e) => {
        const goals_video = e.target.value;
        this.setState(() => ({goals_video}));
    }

    projectsPromptChange = (e) => {
        const projects_prompt = e.target.value;

        this.setState(() => ({projects_prompt}));
    }

    projectsVideoChange = (e) => {
        const projects_video = e.target.value;
        this.setState(() => ({projects_video}));
    }

    timelinesPromptChange = (e) => {
        const timelines_prompt = e.target.value;

        this.setState(() => ({timelines_prompt}));
    }

    timelinesVideoChange = (e) => {
        const timelines_video = e.target.value;
        this.setState(() => ({timelines_video}));
    }

    projectOwnerPromptChange = (e) => {
        const projectOwner_prompt = e.target.value;

        this.setState(() => ({projectOwner_prompt}));
    }

    projectOwnerVideoChange = (e) => {
        const projectOwner_video = e.target.value;
        this.setState(() => ({projectOwner_video}));
    }

    resourcesPromptChange = (e) => {
        const resources_prompt = e.target.value;

        this.setState(() => ({resources_prompt}));
    }

    resourcesVideoChange = (e) => {
        const resources_video = e.target.value;
        this.setState(() => ({resources_video}));
    }

    progressPromptChange = (e) => {
        const progress_prompt = e.target.value;

        this.setState(() => ({progress_prompt}));
    }

    progressVideoChange = (e) => {
        const progress_video = e.target.value;
        this.setState(() => ({progress_video}));
    }

    onSubmit = (e) => { 
        e.preventDefault();

        let emptyField = false;

        for (const key in this.state){
            if(this.state[key] === '' && !(key === 'error' || key === 'success')){
                emptyField = true;
                break;
            }
        }

        if(emptyField){
            this.setState(() => ({
                error: 'All fields are required'
            }));
        }
        else{
            console.log('Submitted!');
        
            axios({
                method: 'post',
                url: '/walkthrough',
                headers: {
                    'x-auth': this.props.token
                },
                data: {
                    objective_prompt: this.state.objective_prompt,
                    objective_video: this.state.objective_video,
                    goals_prompt: this.state.goals_prompt,
                    goals_video: this.state.goals_video,
                    projects_prompt: this.state.projects_prompt,
                    projects_video: this.state.projects_video,
                    timelines_prompt: this.state.timelines_prompt,
                    timelines_video: this.state.timelines_video,
                    projectOwner_prompt: this.state.projectOwner_prompt,
                    projectOwner_video: this.state.projectOwner_video, 
                    resources_prompt: this.state.resources_prompt,
                    resources_video: this.state.resources_video,
                    progress_prompt: this.state.progress_prompt,
                    progress_video: this.state.progress_video
                }
            })
            .then((response) => {
                console.log(response);
                this.setState(() => ({
                    error: '',
                    success: 'Walkthrough updated succesfully!'
                }));
                this.props.setWalkthrough(response.data);
            })
            .catch((e) => {
                this.setState(() => ({
                    success: '',
                    error: e.message
                }));
            });
        }
        
    }

    render() {
        return (
            <div>
                    <h1 className='primary-heading'>Update Walkthrough</h1>
                    <form className='form form--600' onSubmit={this.onSubmit}>
                        <div className='form__form-group'>
                            <label htmlFor='objective_prompt'>Objective Prompt: </label>
                            <input className='form__input' type='text' id='objective_prompt' value={this.state.objective_prompt} placeholder='Objective Prompt' onChange={this.objectivePromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='objective_video'>Objective Video Id: </label>
                            <input className='form__input' type='text' id='objective_video' value={this.state.objective_video} placeholder='Objective Video' onChange={this.objectiveVideoChange} />            
                        </div>
                        <div className='form__form-group'>
                            <label htmlFor='goals_prompt'>Goals Prompt: </label>
                            <input className='form__input' type='text' id='goals_prompt' value={this.state.goals_prompt} placeholder='Goals Prompt' onChange={this.goalsPromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='goals_video'>Goals Video Id: </label>
                            <input className='form__input' type='text' id='goals_video' value={this.state.goals_video} placeholder='Goals Video' onChange={this.goalsVideoChange} />            
                        </div>
                        <div className='form__form-group'>
                            <label htmlFor='projects_prompt'>Projects Prompt: </label>
                            <input className='form__input' type='text' id='projects_prompt' value={this.state.projects_prompt} placeholder='Projects Prompt' onChange={this.projectsPromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='projects_video'>Projects Video Id: </label>
                            <input className='form__input' type='text' id='projects_video' value={this.state.projects_video} placeholder='Projects Video' onChange={this.projectsVideoChange} />            
                        </div>
                        <div className='form__form-group'>
                            <label htmlFor='timelines_prompt'>Timelines Prompt: </label>
                            <input className='form__input' type='text' id='timelines_prompt' value={this.state.timelines_prompt} placeholder='Timelines Prompt' onChange={this.timelinesPromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='timelines_video'>Timelines Video Id: </label>
                            <input className='form__input' type='text' id='timelines_video' value={this.state.timelines_video} placeholder='Timelines Video' onChange={this.timelinesVideoChange} />            
                        </div>
                        <div className='form__form-group'>
                            <label htmlFor='projectOwner_prompt'>Project Owner Prompt: </label>
                            <input className='form__input' type='text' id='projectOwner_prompt' value={this.state.projectOwner_prompt} placeholder='Project Owner Prompt' onChange={this.projectOwnerPromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='projectOwner_video'>Project Owner Video Id: </label>
                            <input className='form__input' type='text' id='projectOwner_video' value={this.state.projectOwner_video} placeholder='Project Owner Video' onChange={this.projectOwnerVideoChange} />            
                        </div>
                        <div className='form__form-group'>
                            <label htmlFor='resources_prompt'>Resources Prompt: </label>
                            <input className='form__input' type='text' id='resources_prompt' value={this.state.resources_prompt} placeholder='Resources Prompt' onChange={this.resourcesPromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='resources_video'>Resources Video Id: </label>
                            <input className='form__input' type='text' id='resources_video' value={this.state.resources_video} placeholder='Resources Video' onChange={this.resourcesVideoChange} />            
                        </div>
                        <div className='form__form-group'>
                            <label htmlFor='progress_prompt'>Progress Prompt: </label>
                            <input className='form__input' type='text' id='progress_prompt' value={this.state.progress_prompt} placeholder='Progress Prompt' onChange={this.progressPromptChange} />
                        </div>
                        <div className='form__form-group'>    
                            <label htmlFor='progress_video'>Progress Video Id: </label>
                            <input className='form__input' type='text' id='progress_video' value={this.state.progress_video} placeholder='Progress Video' onChange={this.progressVideoChange} />            
                        </div>
                        <button className='btn btn-full-width'>Submit new Walkthrough</button>
                        {this.state.error && <p>{this.state.error}</p>}
                        {this.state.success && <p>{this.state.success}</p>}
                    </form>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setWalkthrough: (walkthrough) => dispatch(setWalkthrough(walkthrough))

    };
};

export default connect(null, mapDispatchToProps)(AdminPage);