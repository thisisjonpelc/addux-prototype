import walkthroughReducer from './../../reducers/walkthrough';

test('set up default walkthrough reducer state', () => {
    const state = walkthroughReducer(undefined, {type:'@@INIT'});

    expect(state).toEqual({});
});

test('set up logout walkthrough state', () => {
    const state = walkthroughReducer(undefined, {type:'LOGOUT'});

    expect(state).toEqual({});
});

test('set up initalized walkthrough state', () => {
    const state = walkthroughReducer(undefined, {type:'INITIALIZE_APP', walkthrough:{prompt:'Hello world!'}});

    expect(state).toEqual(
        {
            prompt:'Hello world!'
        }
    );
});

test('should set walkthrough', () => {
    const state = walkthroughReducer(undefined, {type:'SET_WALKTHROUGH', walkthrough:{prompt:'Hello world!'}});

    expect(state).toEqual(
        {
            prompt:'Hello world!'
        }
    );
});