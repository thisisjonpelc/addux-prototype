import dataReducer from './../../reducers/data';

test('should set up default data reducer', () => {

    const state = dataReducer(undefined, {type:'@@INIT'});

    expect(state).toEqual({
        status:'WAITING'
    });

});

test('should set up data received state', () => {
    const state = dataReducer(undefined, {type:'DATA_RECEIVED'});

    expect(state).toEqual({
        status:'RECIEVED'
    });
});

test('should set up data error state', () => {
    const state = dataReducer(undefined, {type: 'DATA_ERROR'});

    expect(state).toEqual({
        status:'ERROR'
    });
});

test('should set up data reset state', () => {
    const state = dataReducer(undefined, {type: 'DATA_RESET'});

    expect(state).toEqual({
        status:'WAITING'
    });
});

test('should set up logout state', () => {
    const state = dataReducer(undefined, {type: 'LOGOUT'});

    expect(state).toEqual({
        status:'WAITING'
    });
});