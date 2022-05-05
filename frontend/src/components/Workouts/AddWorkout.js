import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
        <button className='add-workout-button' onClick={toggleOpen}>Add a Workout</button>
        {isOpen ?
            <form className="add-workout-form" onSubmit={handleSubmit}>
                <input
                    style={{height: 34}}
                    type='text'
                    placeholder="Workout Title"
                    required
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <button className='add-workout-form-button' type="submit">Submit</button>
                <button className='add-workout-form-button' type="button" onClick={toggleOpen}>Cancel</button>
            </form>
        : null
        }
        </>
    );
};

export default AddWorkoutForm;
