import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Signup.css';


const SignupFormPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (loggedUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {
            const user = {
                username,
                email,
                password,
            };
            return dispatch(sessionActions.signupUser(user))
            .then(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        } else {
            setErrors(['Password and Confirm Password fields must match.'])
        }
    }

    return (
        <form className='sign-up' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='sign-up-label'>
                Username
                <input
                type='text'
                required
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
                />
            </label>
            <label className='sign-up-label'>
                Email
                <input
                type='email'
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                />
            </label>
            <label className='sign-up-label'>
                Password
                <input
                type='password'
                required
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                />
            </label>
            <label className='sign-up-label'>
                Confirm Password
                <input
                type='password'
                required
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}
                />
            </label>
            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default SignupFormPage
