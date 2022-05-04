import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExerciseForm from './AddExerciseForm';
import DeleteExercise from './DeleteExercise';
import { Redirect } from 'react-router-dom';
import * as exerciseActions from '../../store/exercise';

const ExercisesPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const exercises = useSelector(state => {
        return state.exercise.list.map(exercise => exercise)
    });

    const [createFormOpen, setCreateFormOpen] = useState(false);

    useEffect(() => {
        dispatch(exerciseActions.getAllExercises())
    }, [dispatch]);

    const toggleCreateFormOpen = () => {
        setCreateFormOpen(!createFormOpen);
    };

    if (!loggedUser) return (
        <Redirect to={'/login'} />
    )

    if (!exercises) {
        return null
    };
    return (
        <div>
            <button onClick={toggleCreateFormOpen}>
                Create an Exercise
                <i class="fa-solid fa-circle-plus"></i>
            </button>
            {createFormOpen ?
                <AddExerciseForm />
            : null
            }
            {exercises.map((exercise) => {
                return (
                    <>
                        <ul>
                            <li key={exercise.id}>
                                <div>Exercise Name: {exercise.title}</div>
                                <div>Exercise Description: {exercise.content}</div>
                                <DeleteExercise exercise/>
                            </li>
                        </ul>
                    </>
                )
            })}
        </div>
    )
};

export default ExercisesPage
