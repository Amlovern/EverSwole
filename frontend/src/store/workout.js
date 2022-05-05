import { csrfFetch } from "./csrf";

const ADD_WORKOUT = 'workout/ADD_WORKOUT';
const GET_WORKOUTS = 'workout/GET_WORKOUT';
const GET_RECENT_WORKOUTS = 'workout/GET_RECENT_WORKOUTS';
export const DELETE_WORKOUT = 'workout/DELETE_WORKOUT';

const addWorkout = workout => ({
    type: ADD_WORKOUT,
    workout
});

const getWorkouts = list => ({
    type: GET_WORKOUTS,
    list
});

const deleteWorkout = workout => ({
    type: DELETE_WORKOUT,
    workout
});

export const getAllWorkouts = () => async dispatch => {
    const response = await csrfFetch('/api/workouts');

    if (response.ok) {
        const workoutList = await response.json();
        dispatch(getWorkouts(workoutList));
    };
};

export const addNewWorkout = payload => async dispatch => {
    const response = await csrfFetch('/api/workouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: payload.title
        })
    });

    if (response.ok) {
        const newWorkout = await response.json();
        dispatch(addWorkout(newWorkout));
        return newWorkout;
    };
};

export const deleteOneWorkout = workoutId => async dispatch => {
    const response = await csrfFetch(`/api/workouts/${workoutId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deletedWorkout = await response.json();
        dispatch(deleteWorkout(deletedWorkout));
    };
};

const initialState = {};

const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUT:
            if (!state[action.workout.id]) {
                const newState = {
                    ...state,
                    [action.workout.id]: action.workout,
                };
               return newState
            }
            return {
                ...state,
                [action.workout.id]: {
                    ...state[action.workout.id],
                    ...action.workout,
                },
            };
        case GET_WORKOUTS:
            const allWorkouts = {};
            action.list.forEach(workout => {
                allWorkouts[workout.id] = workout;
            });
            return {
                ...allWorkouts,
                ...state,
            };
        case DELETE_WORKOUT:
            const postDeletionState = {
                ...state,
            };
            delete postDeletionState[action.workout.id];
            return postDeletionState
        default:
            return state;
    };
};

export default workoutReducer;
