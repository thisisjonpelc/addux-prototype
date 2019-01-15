import {setAdduxes, setActive, editAddux, editComments, addAddux, deleteAddux} from './../../actions/addux';

test('should set up set adduxes action object', () => {
    const action = setAdduxes({
        one:{
            name:'Test addux!'
        },
        two:{
            name:'Test addux!'
        }
    });

    expect(action).toEqual({
        type:'SET_ADDUXES',
        adduxes:{
            one:{
                name:'Test addux!'
            },
            two:{
                name:'Test addux!'
            }
        }
    });
});

test('should set up set active action object', () => {
    const action = setActive('123');

    expect(action).toEqual({
        type:'SET_ACTIVE',
        id:'123'
    });
});

test('should set up edit addux action object', () => {
    const action = editAddux('123', {name:'Jon'});

    expect(action).toEqual({
        type:'EDIT_ADDUX',
        activeAddux:'123',
        updates:{name:'Jon'}
    });
});

test('should set up edit comment action object', () => {
    const action = editComments('123', '456', 'text');

    expect(action).toEqual({
        type:'EDIT_COMMENT',
        adduxId:'123',
        commentId:'456',
        text:'text'
    });
});


test('should set up delete addux action object', () => {
    const action = deleteAddux('123');

    expect(action).toEqual({
        type:'DELETE_ADDUX',
        id:'123'
    });
});

test('should set up add addux action object', () => {
    const action = addAddux({
        hello:"world"
    });

    expect(action).toEqual({
        type:'ADD_ADDUX',
        addux:{
            hello:"world"
        }
    });
})