import {initializeApp} from './../../actions/universal';

test('should set up initialize app action object', () => {
    const action = initializeApp({
        one:{
            name:'Test addux 1'
        },
        two:{
            name:'Test addux 2'
        }
    },
    {walkthrough:'Test walkthrough'});

    expect(action).toEqual({
        type:'INITIALIZE_APP',
        adduxes:{
            one:{
                name:'Test addux 1'
            },
            two:{
                name:'Test addux 2'
            }
        },
        walkthrough:{
            walkthrough:'Test walkthrough'
        }
    });
});