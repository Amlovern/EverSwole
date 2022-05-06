import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as exerciseActions from '../../store/exercise';


const DeleteExercise = ({ exercise }) => {
    const dispatch = useDispatch();
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const toggleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(!deleteConfirmOpen);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const exerciseId = e.target.value;
        dispatch(exerciseActions.deleteOneExercise(exerciseId));
        setDeleteConfirmOpen(false)
    };

    return (
        <div>
            <button className='action-button' onClick={toggleDeleteConfirmOpen}>Delete Exercise</button>
                {deleteConfirmOpen ?
                    <div id="delete">
                        <p className="delete-warning">Are you sure you want to delete?</p>
                        <button className='action-button' value={exercise.id} onClick={handleDelete}>Confirm</button>
                        <button className='action-button' onClick={toggleDeleteConfirmOpen}>Cancel</button>
                    </div>
                : null
                }
        </div>
    )
};

export default DeleteExercise
