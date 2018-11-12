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

import {history} from './../routers/ProtectedRouter';


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
            createModal: false,
            redirectToSubscribePage: false
        }
    }

    changeListActive = () => {
        this.setState((prevState) => ({
           listActive: !prevState.listActive 
        }));
    }

    changeShareActive = () => {
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
        this.setState((prevState) => ({
           notesActive: !prevState.notesActive 
        }));
    }

    changeUserActive = () => {
        this.setState((prevState) => ({
            userActive: !prevState.userActive
        }));
    }

    showCreateModal = () => {
        this.setState({createModal:true});
    }

    handleCloseModal = () => {
        this.setState({createModal:false, editModal:false})
    }

    scrollLeft = () => {
        const mainContent = $('.main-content');
        mainContent.animate({scrollLeft: mainContent.scrollLeft() - 250}, 500);
    }

    scrollRight = () => {
        const mainContent = $('.main-content');
        mainContent.animate({scrollLeft: mainContent.scrollLeft() + 250}, 500);
    }

    createNewModal = (e) => {
        e.preventDefault();
        const name = e.target.children[0].children[0].value;
        
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
            }
        });
    };

    componentDidMount(){
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
            const adduxResponse = responses[0];
            const walkthroughResponse = responses[1];
            
            this.props.initializeApp(adduxResponse.data.adduxes, walkthroughResponse.data);
            this.setState(() => {
                return {
                    dataStatus: 'RECIEVED'
                }
            });
        })
        .catch((err) => {
            console.log(err.response);
            if(err.response.status === 402){
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
            }
        });
    }

    render(){

        // if(this.state.redirectToSubscribePage){
        //     console.log('Redirecting to Subscribe Page');
        //     return (
        //         <Redirect to='/subscribe' />
        //     );
        // }

        if(this.state.dataStatus === "WAITING"){
            return (
                <LoadingPage testId='MainAppPage'/>
            )
        }
        else if(this.state.dataStatus === "RECIEVED"){
            return (
                <div className="app">
                    {!this.props.empty && <ScrollArrow direction={'left'} onArrowClick={this.scrollLeft}/>}
                    {!this.props.empty && <ScrollArrow direction={'right'} onArrowClick={this.scrollRight}/>}                    
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
                    
                    <Columns 
                        showCreateModal={this.showCreateModal} 
                        empty={this.props.empty} 
                        readOnly={false} 
                        showComments={true} 
                        activeAddux={this.props.activeAddux} 
                        walkthrough={this.props.walkthrough}
                    />
                    
                    <Footer showCreateModal={this.showCreateModal}/>
                
                    <AppOverlay 
                        isOpen={this.state.createModal}
                        onRequestClose={this.handleCloseModal}    
                    >
                        <AdduxNameForm 
                            buttonText='Create new Addux' 
                            onSubmit={this.createNewModal}
                            closeModal={this.handleCloseModal}
                            token={this.props.token}
                        />
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
                        <SharePage key={this.props.activeAddux._id}/>
                    </AppOverlay>}

                    {this.props.isAdmin 
                        &&
                    <AppOverlay
                        isOpen={this.state.adminActive}
                        onRequestClose={this.changeAdminActive}
                    >
                        <AdminPage token={this.props.token} />
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

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        empty: Object.keys(state.addux).length === 0 && state.addux.constructor === Object,
        activeAddux: state.addux[state.addux.active],
        isAdmin: state.auth.isAdmin,
        walkthrough: state.walkthrough
    }
};

const mapDispatchToProps = (dispatch) => ({
    initializeApp: (adduxes, walkthrough) => dispatch(initializeApp(adduxes, walkthrough)),
    unsubscribe: () => dispatch(unsubscribe()),
    addAddux: (addux) => dispatch(addAddux(addux))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdduxApp);