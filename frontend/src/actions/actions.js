import axios from 'axios';
import { NEW_USER, EXISTING_USER, GET_USER_DATA, SET_USER_DATA, SUCCESS, ERROR, RESET, LOGOUT, GET_TOKEN } from "./../constants";
const url = "";

export const verify = (data) => (dispatch) => {
    return axios.post(`${url}/auth/verify`, data)
        .then((response) => {
            console.log(response.data);
            dispatch({
                type: EXISTING_USER,
                data: response.data
            });
        }).catch(err => {
            console.error(err.response);
            if(err.response.status === 406){
                dispatch({
                    type: NEW_USER,
                    error: err.response.data
                });
                dispatch(alertError(err.response.data));
                setTimeout(() => dispatch(reset()), 2500);
            }            
        });
}

export const login = (data) => (dispatch) => {
    return axios.post(`${url}/auth/login`, data)
        .then((response) => {
            dispatch({
                type: SET_USER_DATA,
                user: response.data
            })
        }).catch(err => {
            console.log(err)
            dispatch(alertError(err.response.data));
            setTimeout(() => dispatch(reset()), 2500);
        });
}

export const register = (data) => (dispatch) => {
    return axios.post(`${url}/auth/register`, data)
        .then((response) => {
            console.log(response.data)
            dispatch(alertSuccess(response.data));
            dispatch({
                type: SET_USER_DATA,
                user: response.data
            });
            setTimeout(() => dispatch(reset()), 2500);
        }).catch(err => {
            console.log(err)
            dispatch(alertError(err.response.data));
            setTimeout(() => dispatch(reset()), 2500);
        });
}

export const getUserData = () => (dispatch, getState) => {
    const {
        user
    } = getState();
    return axios.get(`${url}/user/details`, {
            headers: {
                "Authorization": user.token
            }
        })
        .then((response) => {
            dispatch({
                type: GET_USER_DATA,
                user: response.data
            })
        });
}

export const alertSuccess = (response) => ({
    type: SUCCESS,
    response: response
});

export const alertError = (error) => ({
    type: ERROR,
    error: error
});

export const reset = () => ({
    type: RESET
});

export const getToken = () => ({
    type: GET_TOKEN
});

export const logout = () => ({
    type: LOGOUT
})