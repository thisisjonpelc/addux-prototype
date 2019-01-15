import {setWalkthrough} from './../../actions/walkthrough';

test('should set up set walkthrough action object', () => {
    const action = setWalkthrough({walkthrough:'Test walkthrough'});

    expect(action).toEqual({
        type:'SET_WALKTHROUGH',
        walkthrough:{walkthrough:'Test walkthrough'}
    });
});