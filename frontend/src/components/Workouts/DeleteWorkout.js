import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
            <button onClick={toggleDeleteConfirmOpen}>Delete Workout</button>
                {deleteConfirmOpen ?
                    <div>
                        <button value={workout.id} onClick={handleDelete}>Confirm</button>
                        <button onClick={toggleDeleteConfirmOpen}>Cancel</button>
                    </div>
                : null}
        </div>
    );
};

export default DeleteWorkout;
