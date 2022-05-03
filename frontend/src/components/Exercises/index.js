import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExerciseForm from './AddExerciseForm';
import { Redirect } from 'react-router-dom';
import * as exerciseActions from '../../store/exercise';

const ExercisesPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const exercises = useSelector(state => {
        return state.exercise.list.map(exercise => exercise)
    });

    useEffect(() => {
        dispatch(exerciseActions.getAllExercises())
    }, [dispatch]);

    const handleDelete = async (e) => {
        e.preventDefault();
        const exerciseId = e.target.value;
        dispatch(exerciseActions.deleteOneExercise(exerciseId));
    }

    if (!loggedUser) return (
        <Redirect to={'/login'} />
    )

    // let exerciseElements = (

    // )
    if (!exercises) {
        return null
    };
    return (
        <div>
            <AddExerciseForm />
            {exercises.map((exercise) => {
                return (
                    <>
                        <ul>
                            <li key={exercise.id}>
                                <div>Exercise Name: {exercise.title}</div>
                                <div>Exercise Description: {exercise.content}</div>
                                <button value={exercise.id} onClick={handleDelete}>Delete Exercise</button>
                            </li>
                        </ul>
                    </>
                )
            })}
        </div>
    )
};

export default ExercisesPage
