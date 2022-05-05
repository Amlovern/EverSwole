import { csrfFetch } from "./csrf";

const ADD_WORKOUT = 'workout/ADD_WORKOUT';
const GET_WORKOUTS = 'workout/GET_WORKOUT';
const GET_RECENT_WORKOUTS = 'workout/GET_RECENT_WORKOUTS';
const DELETE_WORKOUT = 'workout/DELETE_WORKOUT';

const addWorkout = workout => ({
    type: ADD_WORKOUT,
    workout
});

const getWorkouts = list => ({
    type: GET_WORKOUTS,
    list
});

const getRecentWorkouts = list => ({
    type: GET_RECENT_WORKOUTS,
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

export const getTheRecentWorkouts = () => async dispatch => {
    const response = await csrfFetch('/api/workouts/recent');

    if (response.ok) {
        const workoutList = await response.json();
        dispatch(getRecentWorkouts(workoutList));
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

const initialState = {
    list: [],
    recent: []
};

const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUT:
            if (!state[action.workout.id]) {
                const newState = {
                    ...state,
                    [action.workout.id]: action.workout,
                    list: [...state.list, action.workout],
                    recent: [action.workout, ...state.recent]
                };
                newState.recent.pop();
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
        case GET_RECENT_WORKOUTS:
            const recentWorkouts = {};
            action.list.forEach(workout => {
                recentWorkouts[workout.id] = workout;
            });
            return {
                ...recentWorkouts,
                ...state,
                list: state.list,
                recent: action.list
            }
        case DELETE_WORKOUT:
            const postDeletionState = {
                ...state,
                list: state.list.filter(
                    (workout) => workout.id !== action.workout.id
                )
            };
            delete postDeletionState[action.workout.id];
            return postDeletionState
        default:
            return state;
    };
};

export default workoutReducer;
