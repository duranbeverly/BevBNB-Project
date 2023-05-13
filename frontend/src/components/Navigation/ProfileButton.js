import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserSpots } from "../../store/spots";
import { resetCurrentUserSpots } from "../../store/spots";

function ProfileButton({ user }) {

    const spotsObj = useSelector(state => state.spots.allSpots) //getting from single state (clears out when you refresh page)
    const currentUsersSpots = useSelector(state => state.spots.currentUserSpots)
    const spots = Object.values(spotsObj)
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const [isLoading, setIsLoading] = useState(true)

    const [hasSpots, setHasSpots] = useState(false)
    const [hasNoSpots, setHasNoSpots] = useState(false)

    // .then(() => {setLoading(false)}
    //
    let hasSpotsAlready = [];

    useEffect(() => {

        if (!user) {
            setHasSpots(false)
        } else {
            let dataSpots = dispatch(getCurrentUserSpots()).then((data) => {
                if (Object.values(data)[0].length > 0) {
                    //don't need to rely on filter can just get the fetch
                    //this could be an issue later on
                    setHasSpots(true) //these guys will just see create a new spot
                } else {
                    setHasSpots(false)
                }

            })

        }

        //if the new user has spots or if the hasSpots is true then create a slice of state / fetch current user spots if not then do nothing reset the slice of state to zero on re-render
        //if there is no user clear the slice of state that has their
        //each page should be able to handle its own data
    }, [dispatch, user])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())


        closeMenu();
    };



    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className="navButton" onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className="log-in">Hello, {user.username}</li>
                        <li className="log-in">{user.firstName} {user.lastName}</li>
                        <li className="log-in">{user.email}</li>
                        {hasSpots && <li className="log-in"><Link to='/spots/current'>Manage Spots</Link></li>}
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

                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
