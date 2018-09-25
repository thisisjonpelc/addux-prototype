import React from "react";
import {connect} from "react-redux";
import axios from "axios";

import Header from "./Header";
import Columns from "./Columns";
import Footer from "./Footer";
import LoadingPage from "./LoadingPage";
import AdduxList from './AdduxList';

import {dataReceived, dataError} from '../actions/data';
import {setAdduxes, setActive} from '../actions/addux';
import {setWalkthrough} from '../actions/walkthrough';


class AdduxApp extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            listActive: false,
            notesActive: false
        }
    }

    changeListActive = () => {

        console.log("CHANGING LIST STATUS");

        this.setState((prevState) => ({
           listActive: !prevState.listActive 
        }));
    }

    componentDidMount(){
        console.log(this.props.dataStatus);

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
            
            this.props.setAdduxes(adduxResponse.data.adduxes);
            if(adduxResponse.data.adduxes.length > 0){
                this.props.setActive(adduxResponse.data.adduxes[0]._id);
            }
            this.props.setWalkthrough(walkthroughResponse.data);
            this.props.dataReceived();
        })
        .catch((e) => {
            this.props.dataError();
            console.log(e);
        });

        // axios.all(
        //     axios({
        //         method:'get',
        //         url:'/addux',
        //         headers: {
        //             'x-auth': this.props.token
        //         }
        //     }),
        //     axios({
        //         method:'get',
        //         url:'/walkthrough',
        //     })
        // )
        // .then((response) => {
        //     console.log("GET ADDUXES SUCCESSFUL");
        //     console.log(response);
            
        //     //console.log(response.data);
        //     //console.log(response.data.adduxes);
        //     //this.props.setAdduxes(response.data.adduxes);
        //     // if(response.data.adduxes.length > 0){
        //     //     this.props.setActive(response.data.adduxes[0]._id);
        //     // }
        //     // this.props.dataReceived();
        // })
        // .catch((e) => {
        //     console.log("GET ADDUXES FAILED");
        //     this.props.dataError();
        //     console.log(e);
        // });
    }

    render(){

        if(this.props.dataStatus === "WAITING"){
            return (
                <LoadingPage />
            )
        }
        else if(this.props.dataStatus === "RECIEVED"){
            return (
                <div className="app">
                    <AdduxList listActive={this.state.listActive} changeListActive={this.changeListActive}/>
                    <Header changeListActive={this.changeListActive}/>
                    <Columns />
                    <Footer />
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
        dataStatus: state.data.status
    }
};

const mapDispatchToProps = (dispatch) => ({
    dataReceived: () => dispatch(dataReceived()),
    dataError: () => dispatch(dataError()),
    setAdduxes: (adduxes) => dispatch(setAdduxes(adduxes)),
    setActive: (id) => dispatch(setActive(id)),
    setWalkthrough: (walkthrough) => dispatch(setWalkthrough(walkthrough))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdduxApp);