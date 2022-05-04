import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const loggedUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (loggedUser) {
        sessionLinks= (
            <>
                <ProfileButton user={loggedUser} />
                <NavLink to={'/exercises'}>My Exercises</NavLink>
            </>
        )
    } else {
        sessionLinks = (
            <>
                <NavLink to={'/login'}>Log In</NavLink>
                <NavLink to={'/signup'}>Sign Up</NavLink>
            </>
        )
    }

    return (
        <ul>
            <li key='nav'>
                <NavLink exact to={'/'}>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    )
};

export default Navigation;
