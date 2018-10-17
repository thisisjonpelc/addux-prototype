import React from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';
import Modal from 'react-modal';

import Header from "./Header";
import Columns from "./Columns";
import Footer from "./Footer";
import LoadingPage from "./LoadingPage";
import AdduxList from './AdduxList';
import Notes from './Notes';
import ScrollArrow from './ScrollArrow';
import SharePage from './SharePage';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import AdduxNameForm from './AdduxNameForm';
import AppOverlay from './AppOverlay';

import {history} from './../routers/AppRouter';


import {dataReceived, dataError} from '../actions/data';
import {setAdduxes, setActive, addAddux} from '../actions/addux';
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
            shareActive: false,
            adminActive: false,
            notesActive: false,
            userActive: false,
            createModal: false
        }
    }

    changeListActive = () => {

        console.log("CHANGING LIST STATUS");

        this.setState((prevState) => ({
           listActive: !prevState.listActive 
        }));
    }

    changeShareActive = () => {
        console.log('Changing Share Status');
        this.setState((prevState) => ({
            shareActive: !prevState.shareActive
        }));
    }

    changeAdminActive = () => {
        this.setState((prevState) => ({
            adminActive: !prevState.adminActive
        }));
    }

    changeNotesActive = () => {

        console.log("CHANGING NOTE STATUS");

        this.setState((prevState) => ({
           notesActive: !prevState.notesActive 
        }));
    }

    changeUserActive = () => {
        console.log('Changing User active');
        this.setState((prevState) => ({
            userActive: !prevState.userActive
        }));
    }

    showCreateModal = () => {
        this.setState({createModal:true});
    }

    handleCloseModal = () => {
        console.log('Close modal!');
        this.setState({createModal:false, editModal:false})
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

    createNewModal = (e) => {
        e.preventDefault();
        const name = e.target.children[0].children[0].value;
        
        console.log("CREATING NEW MODAL");

        axios.post(
            `/addux`,
            {
                name
            },
            {
                headers: {
                    'x-auth': this.props.token
                }
            })
        .then((response) => {
            console.log("CREATED A NEW ADDUX");
            console.log(response.data);
            this.handleCloseModal();
            this.props.addAddux(response.data.addux);
            //this.props.setActive(response.data.addux._id);
        })
        .catch((e) => {
            if(e.response.status === 402){
                this.props.unsubscribe();
                history.push('/subscribe');
            }
            else{
                console.log("FAILED TO CREATE NEW ADDUX");
                console.log(e);
            }
        })
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
            console.log(e);
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
                    {!this.props.empty && <Notes key={`${this.props.activeAddux._id}-notes`} changeNotesActive={this.changeNotesActive} notesActive={this.state.notesActive} token={this.props.token} activeAddux={this.props.activeAddux}/>}
                    <Header 
                        showCreateModal={this.showCreateModal} 
                        changeListActive={this.changeListActive} 
                        changeShareActive={this.changeShareActive} 
                        changeAdminActive={this.changeAdminActive} 
                        changeNotesActive={this.changeNotesActive} 
                        changeUserActive={this.changeUserActive}
                        empty={this.props.empty} 
                        token={this.props.token}
                    />
                    <Columns empty={this.props.empty} readOnly={false} showComments={true} activeAddux={this.props.activeAddux} walkthrough={this.props.walkthrough}/>
                    <Footer showCreateModal={this.showCreateModal}/>
                    
                
                    <AppOverlay 
                        isOpen={this.state.createModal}
                        onRequestClose={this.handleCloseModal}    
                    >
                        <AdduxNameForm buttonText='Create new Addux' onSubmit={this.createNewModal}/>
                    </AppOverlay>

                    <AppOverlay
                        isOpen={this.state.userActive}
                        onRequestClose={this.changeUserActive}
                    >
                        <UserPage />
                    </AppOverlay>

                    {!this.props.empty 
                        &&
                    <AppOverlay
                        isOpen={this.state.shareActive}
                        onRequestClose={this.changeShareActive}
                    >
                        <SharePage activeAddux={this.props.activeAddux} />
                    </AppOverlay>}

                    {this.props.isAdmin 
                        &&
                    <AppOverlay
                        isOpen={this.state.adminActive}
                        onRequestClose={this.changeAdminActive}
                    >
                        <AdminPage walkthrough={this.props.walkthrough} token={this.props.token} />
                    </AppOverlay>}
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

// <Modal
//                         style = {{
//                             content:{
//                                 top:'50%',
//                                 left:'50%',
//                                 transform: 'translate(-50%, -50%)',
//                                 maxWidth:'30rem',
//                                 height:'16rem'
//                             }
//                         }}
//                         isOpen={this.state.createModal}
//                         contentLabel="Name Your New Addux"
//                         onRequestClose={this.handleCloseModal}
//                         shouldCloseOnOverlayClick={true}
//                     >
//                         <AdduxNameForm buttonText='Create new Addux' onSubmit={this.createNewModal}/>
//                     </Modal>

// {!this.props.empty && <Notes key={`${this.props.activeAddux._id}-notes`} changeNotesActive={this.changeNotesActive} notesActive={this.state.notesActive} token={this.props.token} activeAddux={this.props.activeAddux}/>}
//                     {!this.props.empty && <SharePage hidden={!this.state.shareActive} changeShareActive={this.changeShareActive} activeAddux={this.props.activeAddux}/>}
//                     <UserPage hidden={!this.state.userActive} changeUserActive={this.changeUserActive} />
//                     {this.props.isAdmin && <AdminPage hidden={!this.state.adminActive} changeAdminActive={this.changeAdminActive} walkthrough={this.props.walkthrough} token={this.props.token}/>}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        //dataStatus: state.data.status,
        empty: Object.keys(state.addux).length === 0 && state.addux.constructor === Object,
        activeAddux: state.addux[state.addux.active],
        walkthrough: state.walkthrough,
        isAdmin: state.auth.isAdmin
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
    unsubscribe: () => dispatch(unsubscribe()),
    addAddux: (addux) => dispatch(addAddux(addux))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdduxApp);