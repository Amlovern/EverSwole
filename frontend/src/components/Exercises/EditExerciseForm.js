import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOneExercise } from '../../store/exercise';

const EditExerciseForm = ({ exercise }) => {
    const dispatch = useDispatch();
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [title, setTitle] = useState(exercise.title);
    const [content, setContent] = useState(exercise.content);
    const [errors, setErrors] = useState([]);

    const toggleEditFormOpen = () => {
        setEditFormOpen(!editFormOpen)
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const exerciseId = e.target.value;

        const payload = {
            title,
            content,
            exerciseId
        };

        let updatedExercise = await dispatch(updateOneExercise(payload))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        });
        if (updatedExercise) {
            setEditFormOpen(false);
        };
    };

    return (
        <div>
            <button className='action-button' onClick={toggleEditFormOpen}>Edit Exercise</button>
                {editFormOpen ?
                    <form id='edit-form'>
                        <ul className='edit-errors-list'>
                            {errors.filter((error) => error !== "Invalid value").map((error, idx) => <li className='edit-error' key={idx}>{error}</li>)}
                        </ul>
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
                            cols="20"
                            rows="5"
                            placeholder='Exercise Description'
                            required
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                        />
                        <button className='action-button' value={exercise.id} onClick={handleEdit}>Confirm</button>
                        <button className='action-button' onClick={toggleEditFormOpen}>Cancel</button>
                    </form>
                : null
                }

        </div>
    )
};

export default EditExerciseForm;
