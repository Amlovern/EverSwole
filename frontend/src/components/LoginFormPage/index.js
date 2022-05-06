import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (loggedUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {
            credential,
            password
        };
        return dispatch(sessionActions.loginUser(user))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {
            credential: 'demo@user.com',
            password: 'password'
        };
        return (dispatch(sessionActions.loginUser(user)))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form className='sign-in' onSubmit={handleSubmit}>
            <ul className='login-errors-list'>
                {errors.map((error, idx) => <li className='login-error' key={idx}>{error}</li>)}
            </ul>
            <label className='login-label'>
                Username or Email
                <input
                type='text'
                required
                value={credential}
                onChange={(e) => {
                    setCredential(e.target.value)
                }}
                />
            </label>
            <label className='login-label'>
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
            <button className='login-button' type='submit'>Log In</button>
            <button className='demo-login' type='button' onClick={demoLogin}>Demo User</button>
        </form>
    );
};

export default LoginFormPage;
