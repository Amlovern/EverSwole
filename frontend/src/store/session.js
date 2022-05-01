import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const RESTORE_USER = 'session/RESTORE_USER'

const set = (user) => ({
    type: SET_USER,
    user
});

const restore = (user) => ({
    type: RESTORE_USER,
    user
})

const remove = () => ({
    type: REMOVE_USER,
})

export const loginUser = (user) => async dispatch => {
    const { credential, password } = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential,
            password
        })
    })

    if (response.ok) {
        const newUser = await response.json();
        dispatch(set(newUser.user));
        return newUser;
    }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');

    if (response.ok) {
        const loggedUser = await response.json();
        dispatch(restore(loggedUser.user));
        return loggedUser;
    }
}

export const signupUser = (user) => async dispatch => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method:'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    })

    if (response.ok) {
        const newUser = await response.json();
        dispatch(set(newUser.user));
        return newUser;
    }
};

export const logoutUser = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove());
        return response;
    }
}

/*
    If current session user, session slice of state looks like this:
    {
        user: {
            id,
            email,
            username,
            createdAt,
            updatedAt
        }
    }
*/
const initialState = {
    user: null
};

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            const newUserState = {};
            newUserState.user = action.user;
            console.log(action.user);
            return newUserState;
        case RESTORE_USER:
            const restoredUserState = {};
            restoredUserState.user = action.user;
            return restoredUserState;
        case REMOVE_USER:
            const newState = {...state};
            newState['user'] = null;
            return {...newState};
        default:
            return state;
    };
};

export default sessionReducer;
