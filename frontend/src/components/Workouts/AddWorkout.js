import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewWorkout } from "../../store/workout";


const AddWorkoutForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title
        };

        let newWorkout = await dispatch(addNewWorkout(payload));
        if (newWorkout) {
            setTitle('');
        };
        toggleOpen();
    };



    return (
        <>
        <button onClick={toggleOpen}>Add a Workout</button>
        {isOpen ?
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Workout Title"
                    required
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={toggleOpen}>Cancel</button>
            </form>
        : null
        }
        </>
    );
};

export default AddWorkoutForm;
