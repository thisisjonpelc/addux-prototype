import React from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';

import Header from "./Header";
import Columns from "./Columns";
import Footer from "./Footer";
import LoadingPage from "./LoadingPage";
import AdduxList from './AdduxList';
import Notes from './Notes';
import ScrollArrow from './ScrollArrow';

import {history} from './../routers/AppRouter'


import {dataReceived, dataError} from '../actions/data';
import {setAdduxes, setActive} from '../actions/addux';
import {setWalkthrough} from '../actions/walkthrough';
import {initializeApp} from './../actions/universal';
import {unsubscribe} from './../actions/subscription';


class AdduxApp extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            listActive: false,
            notesActive: false,
            dataStatus: "WAITING",
        }
    }

    changeListActive = () => {

        console.log("CHANGING LIST STATUS");

        this.setState((prevState) => ({
           listActive: !prevState.listActive 
        }));
    }

    changeNotesActive = () => {

        console.log("CHANGING NOTE STATUS");

        this.setState((prevState) => ({
           notesActive: !prevState.notesActive 
        }));
    }

    scrollLeft = () => {
        console.log('SCROLL LEFT');

        const mainContent = $('.main-content');
        mainContent.animate({scrollLeft: mainContent.scrollLeft() - 250}, 500);
    }

    scrollRight = () => {
        console.log('SCROLL RIGHT');

        const mainContent = $('.main-content');
        mainContent.animate({scrollLeft: mainContent.scrollLeft() + 250}, 500);
    }

    componentDidMount(){
        console.log(this.state.dataStatus);

        Promise.all(
            [
                axios({
                    method:'get',
                    url:'/addux',
                    headers: {
                        'x-auth': this.props.token
                    }
                }),
                axios({
                    method: 'get',
                    url: '/walkthrough'
                })
            ])
        .then((responses) => {
            console.log(responses);
            const adduxResponse = responses[0];
            const walkthroughResponse = responses[1];
            
            this.props.initializeApp(adduxResponse.data.adduxes, walkthroughResponse.data);
            this.setState(() => {
                return {
                    dataStatus: 'RECIEVED'
                }
            });
        })
        .catch((e) => {
            if(e.response.status === 402){
                this.props.unsubscribe();
                history.push('/subscribe');
            }
            else{
                //this.props.dataError();
                this.setState(() => {
                    return {
                        dataStatus: 'ERROR'
                    }
                });
                console.log(e);
            }
        });
    }

    render(){

        // if(!this.props.subscribed){
        //     return <Redirect to='/subscribe' />
        // }

        if(this.state.dataStatus === "WAITING"){
            return (
                <LoadingPage />
            )
        }
        else if(this.state.dataStatus === "RECIEVED"){
            return (
                <div className="app">
                    <ScrollArrow direction={'left'} onArrowClick={this.scrollLeft}/>
                    <ScrollArrow direction={'right'} onArrowClick={this.scrollRight}/>                    
                    <AdduxList listActive={this.state.listActive} changeListActive={this.changeListActive} empty={this.props.empty}/>
                    <Header changeListActive={this.changeListActive} empty={this.props.empty} token={this.props.token}/>
                    <Columns empty={this.props.empty} readOnly={false} showComments={true}/>
                    <Footer />
                    <Notes />
                </div>
            );
        }
        else{
            return (
                <h1>Error:  Unable to load data</h1>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        //dataStatus: state.data.status,
        empty: Object.keys(state.addux).length === 0 && state.addux.constructor === Object
        //subscribed: state.subscription.subscribed
    }
};

const mapDispatchToProps = (dispatch) => ({
    // dataReceived: () => dispatch(dataReceived()),
    // dataError: () => dispatch(dataError()),
    // setAdduxes: (adduxes) => dispatch(setAdduxes(adduxes)),
    // setActive: (id) => dispatch(setActive(id)),
    // setWalkthrough: (walkthrough) => dispatch(setWalkthrough(walkthrough)),
    initializeApp: (adduxes, walkthrough) => dispatch(initializeApp(adduxes, walkthrough)),
    unsubscribe: () => dispatch(unsubscribe())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdduxApp);