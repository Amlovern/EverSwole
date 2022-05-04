import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as workoutActions from '../../store/workout';

const WorkoutPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const workouts = useSelector(state => {
        return state.workout.list.map(workout => workout)
    });

    useEffect(() => {
        dispatch(workoutActions.getAllWorkouts())
    }, [dispatch]);

    if (!loggedUser) return (
        <Redirect to={'/login'} />
    );

    if (!workouts) {
        return null
    };

    return (
        <div>
            {workouts.map((workout) => {
                return (
                    <>
                        <ul>
                            <li key={workout.id}>
                                <div>Workout Name: {workout.title}</div>
                            </li>
                        </ul>
                    </>
                )
            })}
        </div>
    )
};

export default WorkoutPage;
