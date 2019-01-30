import authReducer from './../../reducers/auth';

test('should set up default auth values', () => {
    const state = authReducer(undefined, {type:'@@INIT'});

    expect(state).toEqual({});
});

test('should set up user in state', () => {
    const state = authReducer({}, {type:'LOGIN', user: {name: 'Jon', age:30}});

    expect(state).toEqual({
        name:'Jon',
        age:30
    });
});

test('should remove user from state', () => {
    const state = authReducer({name: 'Jon', age:30}, {type:'LOGOUT'})

    expect(state).toEqual({

    });
});

test('should update authentication token', () => {
    const state = authReducer({name:'Jon', age:30, token:'123'}, {type:'UPDATE_TOKEN', token:'abc'});

    expect(state).toEqual({
        name:'Jon',
        age:30,
        token:'abc'
    });
});

test('should update user info', () => {
    const state = authReducer({name:'Jon', age:30, token:'123'}, {type:'UPDATE_USER', updates:{name: 'Jonathan'}});

    expect(state).toEqual({
        name:'Jonathan',
        age:30,
        token:'123'
    });
});