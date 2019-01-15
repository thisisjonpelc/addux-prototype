import { dataReceived, dataError, dataReset } from './../../actions/data';

test('should set up data received action object', () => {
    const action = dataReceived();

    expect(action).toEqual({type:'DATA_RECEIVED'});
});

test('shoud set up data error action object', () => {
    const action = dataError();

    expect(action).toEqual({type:'DATA_ERROR'});
});

test('should set up data reset action object', () => {
    const action = dataReset();

    expect(action).toEqual({type:'DATA_RESET'});
});