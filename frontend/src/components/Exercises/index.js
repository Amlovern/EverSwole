import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExerciseForm from './AddExerciseForm';
import DeleteExercise from './DeleteExercise';
import EditExerciseForm from './EditExerciseForm';
import { Redirect, Link } from 'react-router-dom';
import { getAllExercises } from '../../store/exercise';

const ExercisesPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const exercises = useSelector(state => {
        return state.exercise.list.map(exercise => exercise)
    });

    useEffect(() => {
        dispatch(getAllExercises())
    }, [dispatch]);


    if (!loggedUser) return (
        <Redirect to={'/login'} />
    )

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
                                <div>Workout Title:
                                    <Link to={`/workouts/${exercise.Workout.id}`}>{exercise.Workout.title}</Link>
                                </div>
                                <DeleteExercise exercise={exercise}/>
                                <EditExerciseForm exercise={exercise}/>
                            </li>
                        </ul>
                    </>
                )
            })}
        </div>
    )
};

export default ExercisesPage
