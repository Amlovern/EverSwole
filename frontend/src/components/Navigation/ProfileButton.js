import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    };

    return (
        <>
            <button className='profile-button' onClick={openMenu}>
                {/* <i class="fa-solid fa-person-running"></i> */}
                    <div>{user.username}</div>
                    <i className="fa-solid fa-bars"></i>
            </button>
            {showMenu && (
                <ul className='profile-dropdown'>
                    {/* <li key={user.username}>{user.username}</li> */}
                    {/* <li key={user.email}>{user.email}</li> */}
                    <li key={user.id}>
                        <button className='logout-button' onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
};

export default ProfileButton;
