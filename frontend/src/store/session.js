import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const set = (user) => ({
    type: SET_USER,
    user
});

const remove = () => ({
    type: REMOVE_USER,
})

export const loginUser = (user) => async dispatch => {
    console.log('************************', user);
    const { email, username, password } = user
    // let csrf = await csrfFetch('/api/session', {method: "POST"}).then(res => res.json());
    // console.log('csrf fetch', csrf)
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential: username ? username : email,
            password
        })
    })

    if (response.ok) {
        const newUser = await response.json();
        dispatch(set(newUser));
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
            const newUserState = {...state};
            newUserState['user'] = action.user;
            return {...newUserState};
        case REMOVE_USER:
            const newState = {...state};
            newState['user'] = null;
            return {...newState};
        default:
            return state;
    };
};

export default sessionReducer;
