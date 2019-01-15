export const saveAuthToken = store => next => action => {

    switch(action.type){
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