import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    // stopPropagation keeps this click from reaching the document "click outside" listener below.
    // React 18 attaches that listener during the same click, so without it the menu closed as soon as it opened.
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(prev => !prev);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        closeMenu();
        dispatch(sessionActions.logout()).then(() => history.push('/'))
    };

    const demoLogin = (e) => {
        e.preventDefault();
        closeMenu();
        dispatch(sessionActions.login({ credential: "Rich-Guy", password: "password" }))
    };



    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className="navButton" onClick={toggleMenu} aria-label="Account menu" aria-expanded={showMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className="log-in">Hello, {user.firstName}</li>
                        <li className="log-in line">{user.email}</li>
                        <li className="log-in line menu-create-spot"><Link to='/spots/new' onClick={closeMenu}>Create a Spot</Link></li>
                        <li className="log-in line"><Link to='/spots/current' onClick={closeMenu}>Manage Spots</Link></li>
                        <li className="log-in line"><Link to='/bookings' onClick={closeMenu}>Trips</Link></li>
                        <li className="log-in-button">
                            <button className="logout-button" onClick={logout}>Log Out</button>
                        </li>

                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                        <li className="demo-user" onClick={demoLogin}>Demo User</li>

                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
