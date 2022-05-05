import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNewExercise} from '../../store/exercise';
import { getAllWorkouts } from '../../store/workout';

const AddExerciseForm = () => {
    const dispatch = useDispatch();
    const workouts = useSelector(state => {
        return state.workout.list.map(workout => workout)
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [workoutTitle, setWorkoutTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllWorkouts())
    }, [dispatch])

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            workoutTitle
        };
        let newExercise = await dispatch(addNewExercise(payload));
        if (newExercise) {
            setTitle('');
            setContent('');
            setWorkoutTitle('');
        }

        toggleIsOpen();
    }


    return (
        <>
            <button onClick={toggleIsOpen}>
                Create an Exercise
                <i class="fa-solid fa-circle-plus"></i>
            </button>
            {isOpen ?
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
                        placeholder='Exercise Description'
                        required
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                        />
                    <label>Choose a Workout:</label>
                    <select id='workout-select' required onChange={(e) => {
                        setWorkoutTitle(e.target.value)
                    }}>
                        <option value=''>Please Select a Workout...</option>
                        {workouts.map((workout) => {
                            return (
                                <>
                                    <option value={workout.title}>{workout.title}</option>
                                </>
                            )
                        })}
                    </select>
                    <button type='submit'>Create Exercise</button>
                </form>
            : null}
        </>
    );
};

export default AddExerciseForm;
