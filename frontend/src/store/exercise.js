import { csrfFetch } from "./csrf";
import { DELETE_WORKOUT } from "./workout";

const ADD_EXERCISE = 'exercise/ADD_EXERCISE';
const UPDATE_EXERCISE = 'exercise/UPDATE_EXERCISE';
const GET_EXERCISES = 'exercise/GET_EXERCISES';
const DELETE_EXERCISE = 'exercise/DELETE_EXERCISE';


const addExercise = exercise => ({
    type: ADD_EXERCISE,
    exercise
});

const updateExercise = exercise => ({
    type: UPDATE_EXERCISE,
    exercise
});

const getExercises = list => ({
    type: GET_EXERCISES,
    list
});

const deleteExercise = exercise => ({
    type: DELETE_EXERCISE,
    exercise
})

export const addNewExercise = (payload) => async dispatch => {
    const response = await csrfFetch('/api/exercises', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newExercise = await response.json();
        dispatch(addExercise(newExercise));
        return newExercise;
    };
};

export const updateOneExercise = payload => async dispatch => {
    const response = await csrfFetch(`/api/exercises/${payload.exerciseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: payload.title,
            content: payload.content
        })
    })

    if (response) {
        const updatedExercise = await response.json();
        dispatch(updateExercise(updatedExercise));
        return updatedExercise
    };
};

export const getAllExercises = () => async dispatch => {
    const response = await csrfFetch('/api/exercises');

    if (response) {
        const exerciseList = await response.json();
        dispatch(getExercises(exerciseList));
    };
};

export const deleteOneExercise = (exerciseId) => async dispatch => {
    const response = await csrfFetch(`/api/exercises/${exerciseId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deletedExercise = await response.json();
        dispatch(deleteExercise(deletedExercise))
    }
}

const initialState = {
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXERCISE:
            if (!state[action.exercise.id]) {
                const newState = {
                    ...state,
                    [action.exercise.id]: action.exercise,
                };
                return newState;
            }
            return {
                ...state,
                [action.exercise.id]: {
                    ...state[action.exercise.id],
                    ...action.exercise,
                },
            };
        case UPDATE_EXERCISE:
            const updatedState = {
                ...state,
            }
            updatedState[action.exercise.id].title = action.exercise.title;
            updatedState[action.exercise.id].content = action.exercise.content;
            return updatedState
        case GET_EXERCISES:
            const allExercises = {};
            action.list.forEach(exercise => {
                allExercises[exercise.id] = exercise;
            });
            return {
                ...allExercises,
                ...state,
            };
        case DELETE_EXERCISE:
            const postDeletionState = {
                ...state,
                };
            delete postDeletionState[action.exercise.id];
            return postDeletionState;
        case DELETE_WORKOUT:
            return initialState;
        default:
            return state;
    };
};

export default exerciseReducer;
