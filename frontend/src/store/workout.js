import { csrfFetch } from "./csrf";

const ADD_WORKOUT = 'workout/ADD_WORKOUT';
const GET_WORKOUTS = 'workout/GET_WORKOUT';
const DELETE_WORKOUT = 'workout/DELETE_WORKOUT';

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

const initialState = {
    list: []
};

const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUT:
            if (!state[action.workout.id]) {
                const newState = {
                    ...state,
                    [action.workout.id]: action.workout,
                    list: [...state.list, action.workout]
                };
                const workoutList = newState.list.map(id => newState[id]);
                workoutList.push(action.workout)
                return newState
            }
            return {
                ...state,
                [action.workout.id]: {
                    ...state[action.workout.id],
                    ...action.workout,
                    list: state.list
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
                list: action.list
            };

        default: return state
    };
};

export default workoutReducer;
