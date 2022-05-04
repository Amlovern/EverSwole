import { csrfFetch } from "./csrf";

const ADD_WORKOUT = 'workout/ADD_WORKOUT';
const GET_WORKOUTS = 'workout/GET_WORKOUT';
const DELETE_WORKOUT = 'workout/DELETE_WORKOUT';

const addWorkout = workout => ({
    type: ADD_WORKOUT,
    workout
});

const getWorkouts = () => ({
    type: GET_WORKOUTS,
});

const deleteWorkout = workout => ({
    type: DELETE_WORKOUT,
    workout
});

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
                    ...action.workout
                },
            };

        default: return state
    };
};

export default workoutReducer;
