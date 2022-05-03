import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExerciseForm from './AddExerciseForm';

const ExercisesPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user)


    return (
        <div>
            <AddExerciseForm />
        </div>
    )
};

export default ExercisesPage
