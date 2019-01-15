import {login, logout, updateToken, updateUser} from './../../actions/auth';

test('should set up login action object', () => {

    const action = login({name:'Jon'});

    expect(action).toEqual({
        type:'LOGIN',
        user:{name:'Jon'}
    });

});

test('should set up logout action object', () => {
    const action = logout();

    expect(action).toEqual({
        type:'LOGOUT'
    });
});

test('should set up update token action object', () => {
    const action = updateToken('123');

    expect(action).toEqual({
        type:'UPDATE_TOKEN',
        token:'123'
    });
});

test('should set up update user action object', () => {
    const action = updateUser({name: 'Jon', age: 30});

    expect(action).toEqual({
        type:'UPDATE_USER',
        updates:{name: 'Jon', age:30}
    });
});