// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './Assets/BevBnb.png'
import './Navigation.css';
import { Link } from 'react-router-dom';
import { CreateSpot } from '../Spots/CreateSpot';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='navbar'>
            <li className='navLi'>

                <NavLink exact to="/">
                    <img className="logo" src={logo} />
                </NavLink>
            </li>
            {isLoaded && (
                <>

                    <li className='navLi'>
                        <div className='nav-top-right'>
                            {sessionUser ? (<Link className="create-spot-text" to='/spots/new'>Create a Spot</Link>) : null}
                            <ProfileButton user={sessionUser} />
                        </div>
                    </li>

                </>
            )}
        </ul>
    );
}

export default Navigation;
