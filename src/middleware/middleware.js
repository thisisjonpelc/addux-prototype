import axios from 'axios';

import {login, logout} from './../actions/auth';

export const saveAuthToken = store => next => action => {

    switch(action.type){

        case "ON_INIT":
            if(localStorage.getItem('AUTH_TOKEN')){
                console.log("There is an authorization token");

                axios({
                    method: 'get',
                    url: '/users/me/token',
                    headers: {'x-auth': localStorage.getItem('AUTH_TOKEN')}
                })
                .then((response) => {
                    
                    console.log(response);

                    try{
                        console.log('Trying to save auth token to local storage');
                        localStorage.setItem('AUTH_TOKEN', response.headers['x-auth']);
                    }
                    catch(e){
                        console.log(e);                        
                        console.log('Could not save authentication token');
                    }

                    next(login(
                        {
                            ...response.data,
                            token: response.headers['x-auth']
                        }
                    ));

                })
                .catch((e) => {
                    console.log('IT DIDN\'T WORK');
                    console.log(e);
                });
            }
            else{
                console.log('There is no authorization token');
            }
            break;
        case 'LOGIN':
            try{
                console.log('Trying to save auth token to local storage');
                localStorage.setItem('AUTH_TOKEN', action.user.token);
            }
            catch(e){
                console.log('Could not save authentication token');
            }
            break;
        case 'LOGOUT':
            try{
                console.log('Trying to remove auth token from local storage');
                localStorage.removeItem('AUTH_TOKEN');
            }
            catch(e){
                console.log('Could not remove authentication token');
            }
            break;
    }

    return next(action);

}