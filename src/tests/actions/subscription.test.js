import {subscribe, unsubscribe} from './../../actions/subscription';

test('should set up subscribe action object', () => {
    const action = subscribe();
    
    expect(action).toEqual({type:'SUBSCRIBE'});
});

test('should set up unsubscribe action object', () => {
    const action = unsubscribe();

    expect(action).toEqual({type:'UNSUBSCRIBE'});
});