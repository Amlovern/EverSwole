import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneWorkout } from "../../store/workout";


const DeleteWorkout = ({ workout }) => {
    const dispatch = useDispatch();
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const toggleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(!deleteConfirmOpen);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const workoutId = e.target.value;
        dispatch(deleteOneWorkout(workoutId));
        setDeleteConfirmOpen(false);
    };


    return (
        <div>
            <button className='action-button' onClick={toggleDeleteConfirmOpen}>Delete Workout</button>
                {deleteConfirmOpen ?
                    <div>
                        <p className="delete-warning">Delete Workout and All Related Exercises?</p>
                        <button className='action-button' value={workout.id} onClick={handleDelete}>Confirm</button>
                        <button className='action-button' onClick={toggleDeleteConfirmOpen}>Cancel</button>
                    </div>
                : null}
        </div>
    );
};

export default DeleteWorkout;
