import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as workoutActions from '../../store/workout';
import AddWorkoutForm from "./AddWorkout";
import DeleteWorkout from "./DeleteWorkout";
import './Workouts.css';

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
        <div className="workouts-page">
            <h1>Workouts</h1>
            <AddWorkoutForm />
            <table id="workout-table">
                <thead>
                    <tr className="workout-table-headers">
                        <th className="name-col" scope="col">Workout Name</th>
                        <th className="username-col" scope="col">Created by</th>
                        <th className="actions-col" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout) => {
                        return (

                            <tr>
                                <td className="name-col">{workout.title}</td>
                                <td className="username-col">{loggedUser.username}</td>
                                <td className="actions-col"><DeleteWorkout workout={workout} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* {workouts.map((workout) => {
                return (
                    <>
                        <ul className="workout-listing">
                            <li key={workout.id}>
                                <div>Workout Name: {workout.title}</div>
                                <DeleteWorkout workout={workout} />
                            </li>
                        </ul>
                    </>
                )
            })} */}
        </div>
    )
};

export default WorkoutPage;
