import streams from '../apis/streams';
import history from '../history';

import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM 
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
}

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', {...formValues, userId});
        dispatch({ 
            type: CREATE_STREAM,
            payload: response.data
        });
        //Do some programatic navigation para que el usuario vaya al home a ver la lista con la nueva creada
        history.push('/'); //creamos nuestra history en cambio del browserrouter que trae por defecto, para poder acceder a los metodos de histoiry
    }
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch ({ type: FETCH_STREAMS, payload: response.data});
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload:response.data});
}

export const editStream = (id, formValues) => async dispatch => {
    //el put cambia todo registro, el patch cambia algunos como en este caso titulo y desc
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data});
    history.push('/');
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    // no hace falta un response porque no tiene que devovler nada

    dispatch({ type: DELETE_STREAM, payload: id});
    history.push('/');
}