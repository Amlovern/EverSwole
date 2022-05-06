import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExerciseForm from './AddExerciseForm';
import DeleteExercise from './DeleteExercise';
import EditExerciseForm from './EditExerciseForm';
import { Redirect, Link } from 'react-router-dom';
import { getAllExercises } from '../../store/exercise';
import './Exercises.css';

const ExercisesPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const exercisesObj = useSelector(state => state.exercise);
    const exerciseList = Object.values(exercisesObj)

    useEffect(() => {
        dispatch(getAllExercises())
    }, [dispatch]);


    if (!loggedUser) return (
        <Redirect to={'/login'} />
    )

    if (!exerciseList) {
        return null
    };
    return (
        <div className='exercises-page'>
            <h1>Exercises</h1>
            <AddExerciseForm />
            <table id='exercises-table'>
                <thead>
                    <tr className='exercise-table-headers'>
                        <th className="name-col" scope='col'>Exercise Name</th>
                        <th className='description-col' scope='col'>Exercise Description</th>
                        <th className='workout-col' scope='col'>Workout Title</th>
                        <th className="username-col" scope='col'>Created by</th>
                        <th className="actions-col" scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList.map((exercise) => {
                        return(
                            <tr>
                                <td className="name-col">{exercise.title}</td>
                                <td className='description-col'>{exercise.content}</td>
                                <td className='workout-col'>
                                    <Link to={`/workouts/${exercise.Workout.id}`}>{exercise.Workout.title}</Link>
                                </td>
                                <td className="username-col">{loggedUser.username}</td>
                                <td className="actions-col">
                                    <DeleteExercise exercise={exercise}/>
                                    <EditExerciseForm exercise={exercise}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default ExercisesPage
