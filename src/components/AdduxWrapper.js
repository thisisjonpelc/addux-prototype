import React from "react";
import {connect} from "react-redux";
import axios from 'axios';

import AdduxApp from "./AdduxApp";
import SignUpPage from "./SignUpPage";
import LoadingPage from './LoadingPage';

import {login} from './../actions/auth';

class AdduxWrapper extends React.Component{
    constructor(props){
        super(props);

        this.state = {
             checkAuth: true
        }
    }

    // componentDidMount(){
    //         if(!this.state.checkAuth){
            
    //             if(localStorage.getItem('AUTH_TOKEN')){
    //                 console.log("There is an authorization token");
        
    //                 axios({
    //                     method: 'get',
    //                     url: '/users/me/token',
    //                     headers: {'x-auth': localStorage.getItem('AUTH_TOKEN')}
    //                 })
    //                 .then((response) => {
                        
    //                     console.log(response); 
        
    //                     this.props.login(
    //                         {
    //                             ...response.data,
    //                             token: response.headers['x-auth']
    //                         }
    //                     );
                        
    //                     this.setState(() => ({checkAuth: true}));
    
    //                 })
    //                 .catch((e) => {
    //                     console.log('IT DIDN\'T WORK');
    //                     console.log(e);
    //                 });
    //             }
    //             else{
    //                 console.log('There is no authorization token');
    //                 this.setState(() => ({checkAuth: true}));
    //             }   
    //         }
        
    // }

    render(){

        if(this.state.checkAuth){
            return this.props.isAuthenticated ? (<AdduxApp />) : (<SignUpPage />);
        }
        else{
            return <LoadingPage />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: '_id' in state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdduxWrapper);