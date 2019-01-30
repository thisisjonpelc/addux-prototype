import adduxReducer from '../../reducers/addux';

test('should setup default addux values', () => {
    const state = adduxReducer(undefined, {type:'@@INIT'});

    expect(state).toEqual({});
});

test('should set active to given id', () => {
    const state = adduxReducer(null, {type:'SET_ACTIVE', id:'123'});

    expect(state).toEqual({
        active:'123'
    });
});

test('should set adduxes to given array', () => {
    const state = adduxReducer(null, {type:'INITIALIZE_APP', adduxes:[{_id:'one', content:'first'}, {_id:'two', content:'second'}]});
    const state2 = adduxReducer(null, {type:'SET_ADDUXES', adduxes:[{_id:'one', content:'first'}, {_id:'two', content:'second'}]});

    expect(state).toEqual({
        one: {
            _id:'one',
            content:'first'
        },
        two:{
            _id:'two',
            content:'second'
        },
        active:'one'
    });

    expect(state2).toEqual({
        one: {
            _id:'one',
            content:'first'
        },
        two:{
            _id:'two',
            content:'second'
        },
        active:'one'
    });
});

test('should update active addux with new values', () => {
    const state = adduxReducer({active:'one', one:{_id:'one', name:'Old Name'}}, {type:'EDIT_ADDUX', activeAddux:'one', updates:{name:'New Name'}})

    expect(state).toEqual({
        active:'one',
        one:{
            _id:'one',
            name:'New Name'
        }
    });
});

test('should edit comment with new values', () => {
    const state = adduxReducer({active: 'one', one:{_id:'one', name:'Old Name', progress_comments:{text: 'Old Comment'}}}, {type:'EDIT_COMMENT', adduxId:'one', commentId:'progress_comments', text:'New Comment'});

    expect(state).toEqual({
        active:'one',
        one:{
            _id:'one',
            name:'Old Name',
            progress_comments:{
                text:'New Comment'
            }
        }
    });

});

test('should add addux', () => {
   const state = adduxReducer(null, {type:'ADD_ADDUX', addux:{_id:'one', name:'New addux'}});
   
   expect(state).toEqual({
       active:'one',
       one:{
           _id:'one',
           name:'New addux'
       }
   });
   
});

test('should delete addux', () => {
    const state = adduxReducer({active:'one', one:{_id:'one', name:'First addux'}}, {type:'DELETE_ADDUX', id:'one'});

    expect(state).toEqual({});
});

test('should delete addux and change active', () => {
    const state = adduxReducer({active:'one', one:{_id:'one', name:'First addux'}, two:{_id:'two', name:'Second addux'}}, {type:'DELETE_ADDUX', id:'one'});

    expect(state).toEqual({
        active:'two',
        two:{
            _id:'two',
            name:'Second addux'
        }
    });
});

test('should delete addux and keep active', () => {
    const state = adduxReducer({active:'one', one:{_id:'one', name:'First addux'}, two:{_id:'two', name:'Second addux'}}, {type:'DELETE_ADDUX', id:'two'});

    expect(state).toEqual({
        active:'one',
        one:{
            _id:'one',
            name:'First addux'
        }
    });
});

test('should return logout addux state', () => {
    const state = adduxReducer(null, {type:'LOGOUT'});

    expect(state).toEqual({

    });
})