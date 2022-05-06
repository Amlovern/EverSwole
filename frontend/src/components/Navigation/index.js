import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const loggedUser = useSelector(state => state.session.user);

    return (
        <nav className='navBar'>
            <ul className='nav-list'>
                <li key='nav'>
                    <NavLink className='nav-home' exact to='/'
                    style={(state) => ({
                        color: state ? 'rgb(200, 243, 200)' : 'rgb(201, 201, 201)'
                    })}
                    >Home</NavLink>
                    <h1 className='nav-header'>EverSwole</h1>
                    {isLoaded &&
                    loggedUser ?
                        <nav className='conditional-nav'>
                            <ProfileButton user={loggedUser} />
                            <NavLink className='nav-link' to='/exercises'
                            style={(state) => ({
                                color: state ? 'rgb(200, 243, 200)' : 'rgb(201, 201, 201)'
                            })}
                            >My Exercises</NavLink>
                            <NavLink className='nav-link' to='/workouts'
                            style={(state) => ({
                                color: state ? 'rgb(200, 243, 200)' : 'rgb(201, 201, 201)'
                            })}
                            >My Workouts</NavLink>
                        </nav>
                        :
                        <nav className='conditional-nav'>
                            <NavLink className='nav-link' to='/login'
                            style={(state) => ({
                                color: state ? 'rgb(200, 243, 200)' : 'rgb(201, 201, 201)'
                            })}
                            >Log In</NavLink>
                            <NavLink className='nav-link' to='/signup'
                            style={(state) => ({
                                color: state ? 'rgb(200, 243, 200)' : 'rgb(201, 201, 201)'
                            })}
                            >Sign Up</NavLink>
                        </nav>
                    }
                </li>
            </ul>
        </nav>
    )
};

export default Navigation;
