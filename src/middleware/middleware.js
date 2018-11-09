import axios from 'axios';

import {login, logout} from './../actions/auth';

export const saveAuthToken = store => next => action => {

    switch(action.type){

        case "ON_INIT":
            if(localStorage.getItem('AUTH_TOKEN')){
                axios({
                    method: 'get',
                    url: '/users/me/token',
                    headers: {'x-auth': localStorage.getItem('AUTH_TOKEN')}
                })
                .then((response) => {
                    

                    try{
                        localStorage.setItem('AUTH_TOKEN', response.headers['x-auth']);
                    }
                    catch(e){
                        
                    }

                    next(login(
                        {
                            ...response.data,
                            token: response.headers['x-auth']
                        }
                    ));

                })
                .catch((e) => {
                    
                });
            }
            else{

            }
            break;
        case 'LOGIN':
            try{
                localStorage.setItem('AUTH_TOKEN', action.user.token);
            }
            catch(e){

            }
            break;
        case 'LOGOUT':
            try{
                localStorage.removeItem('AUTH_TOKEN');
            }
            catch(e){

            }
            break;
    }

    return next(action);

}