import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as workoutActions from '../../store/workout';
import AddWorkoutForm from "./AddWorkout";
import DeleteWorkout from "./DeleteWorkout";

const WorkoutPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const workouts = useSelector(state => {
        return state.workout.recent.map(workout => workout)
    });

    useEffect(() => {
        dispatch(workoutActions.getTheRecentWorkouts())
    }, [dispatch]);

    if (!loggedUser) return (
        <Redirect to={'/login'} />
    );

    if (!workouts) {
        return null
    };

    return (
        <div>
            <AddWorkoutForm />
            {workouts.map((workout) => {
                return (
                    <>
                        <ul>
                            <li key={workout.id}>
                                <div>Workout Name: {workout.title}</div>
                                <DeleteWorkout workout={workout} />
                            </li>
                        </ul>
                    </>
                )
            })}
        </div>
    )
};

export default WorkoutPage;
