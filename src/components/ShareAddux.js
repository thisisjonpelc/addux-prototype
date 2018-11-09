import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import LoadingPage from './LoadingPage';
import HeaderSharing from './HeaderSharing';
import ScrollArrow from './ScrollArrow';
import Columns from './Columns';

class ShareAddux extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            retrievedData : false,
            activeAddux : {},
            walkthrough : {}
        }
    }

    componentDidMount() {
        
        Promise.all(
            [
                axios({
                    method:'get',
                    url:`/addux/${this.props.match.params.id}`
                }),
                axios({
                    method: 'get',
                    url: '/walkthrough'
                })
            ])
        .then((responses) => {
            const adduxResponse = responses[0];
            const walkthroughResponse = responses[1];

            this.setState(() => {
                return {
                    retrievedData: true,
                    activeAddux: adduxResponse.data.addux,
                    walkthrough: walkthroughResponse.data
                }
            });
        })
        .catch((e) => {

        });
    }

    scrollLeft = () => {
        const mainContent = $('.main-content');
        mainContent.animate({scrollLeft: mainContent.scrollLeft() - 250}, 500);
    }

    scrollRight = () => {
        const mainContent = $('.main-content');
        mainContent.animate({scrollLeft: mainContent.scrollLeft() + 250}, 500);
    }

    render(){

        if(this.state.retrievedData === false){
            return (
                <LoadingPage />
            )
        }
        else{

            return(
                <div className="app">
                    <ScrollArrow direction={'left'} onArrowClick={this.scrollLeft}/>
                    <ScrollArrow direction={'right'} onArrowClick={this.scrollRight}/>                    
                    <HeaderSharing activeAddux={this.state.activeAddux}/>
                    <Columns 
                        empty={false} 
                        readOnly={true} 
                        showComments={this.props.showComments} 
                        activeAddux={this.state.activeAddux} 
                        walkthrough={this.state.walkthrough}
                    />
                </div>
            )
        }
    }
}

export default ShareAddux;