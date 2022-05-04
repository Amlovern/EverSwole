import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOneExercise } from '../../store/exercise';

const EditExerciseForm = ({ exercise }) => {
    const dispatch = useDispatch();
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [title, setTitle] = useState(exercise.title);
    const [content, setContent] = useState(exercise.content);

    const toggleEditFormOpen = () => {
        setEditFormOpen(!editFormOpen)
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const exerciseId = e.target.value;

        const payload = {
            title,
            content,
            exerciseId
        };

        let updatedExercise = await dispatch(updateOneExercise(payload));
        if (updatedExercise) {
            setEditFormOpen(false);
        };
    };

    return (
        <div>
            <button onClick={toggleEditFormOpen}>Edit Exercise</button>
                {editFormOpen ?
                    <form>
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
                        <button value={exercise.id} onClick={handleEdit}>Confirm</button>
                        <button onClick={toggleEditFormOpen}>Cancel</button>
                    </form>
                : null
                }

        </div>
    )
};

export default EditExerciseForm;
