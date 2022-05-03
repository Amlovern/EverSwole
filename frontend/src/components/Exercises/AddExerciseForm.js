import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNewExercise} from '../../store/exercise';
import { Redirect } from 'react-router-dom'

const AddExerciseForm = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [workoutTitle, setWorkoutTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            workoutTitle
        };
        let newExercise = await dispatch(addNewExercise(payload));
        if (newExercise) {
            return (
                <Redirect to={'/api/exercises'} />
            )
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Exercise Title'
                required
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
            <textarea
                placeholder='Exercise Content'
                required
                value={content}
                onChange={(e) => {
                    setContent(e.target.value)
                }}
            />
            <input
                type='text'
                placeholder='Workout Title'
                required
                value={workoutTitle}
                onChange={(e) => {
                    setWorkoutTitle(e.target.value)
                }}
            />
            <button type='submit'>Create Exercise</button>
        </form>
    );
};

export default AddExerciseForm;
