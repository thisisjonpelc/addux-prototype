import subscriptionReducer from './../../reducers/subscription';

test('should set up default subscription state', () => {
    const state = subscriptionReducer(undefined, {type:'@@INIT'});

    expect(state).toEqual({
        subscribed:null
    });
});

test('should set up initialized subscription state', () => {
    const state = subscriptionReducer(undefined, {type:'INITIALIZE_APP'});

    expect(state).toEqual({
        subscribed:true
    });
});

test('should set up subscribed state', () => {
    const state = subscriptionReducer(undefined, {type:'SUBSCRIBE'});

    expect(state).toEqual({
        subscribed:true
    });
});

test('should set up unsubscribed state', () => {
    const state = subscriptionReducer(undefined, {type:'UNSUBSCRIBE'});

    expect(state).toEqual({
        subscribed:false
    });
});

test('should set up logout subscription state', () => {
    const state = subscriptionReducer(undefined, {type:'LOGOUT'});

    expect(state).toEqual({
        subscribed:null
    });
});