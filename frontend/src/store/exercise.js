import { csrfFetch } from "./csrf";

const ADD_EXERCISE = 'exercise/ADD_EXERCISE';


const addExercise = exercise => ({
    type: ADD_EXERCISE,
    exercise
});

export const addNewExercise = (payload) => async dispatch => {
    console.log('LINE 12')
    const response = await csrfFetch('/api/exercises', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newExercise = await response.json();
        console.log(newExercise);
        // dispatch(addExercise(newExercise));
        // return newExercise;
    };
};

const initialState = {};

const exerciseReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        // case ADD_EXERCISE:
        //     console.log(action.exercise)
            // const newState = {
            //     ...state,
            //     [action.exercise.id]: {action.exercise}
            // };
            // return newState;
        default:
            return state;
    };
};

export default exerciseReducer;
