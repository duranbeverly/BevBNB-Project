import { img } from "../../utils/img";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import "./Spot.css"

const COMING_SOON = "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683912193/App%20Academy%20Front%20End%20Project/other_assets/coming_soon_dfutsv.jpg";

import OpenModalButton from '../OpenModalButton';
import { HandleDeleteSpot } from './HandleDeleteSpot';

export const CurrentSpotInfo = ({ currentSpot }) => {


    return (
        <div>
            <div className='image-card' title={currentSpot.name}>
                <Link className="link" to={`/spots/${currentSpot.id}`}>
                    <div className='image-box'>
                        <img src={img(currentSpot.previewImage || COMING_SOON, 600)} alt={currentSpot.name} loading="lazy" decoding="async" />
                    </div>
                    <div className='spot-info'>
                        <h2 className='title-spots'>{currentSpot.name}</h2>
                        <div className='price-stars'>
                            <p>{`${currentSpot.city}, ${currentSpot.state}`}</p>
                            <p> <i className="fa-solid fa-star fa-2xs"></i> {`${currentSpot.avgRating ? Number(currentSpot.avgRating).toFixed(2) : "New"}`}</p>
                        </div>
                        <p className='price-spots'>{`$${currentSpot.price} night`}</p>
                    </div>
                </Link>
                <Link to={`/spots/${currentSpot.id}/edit`}>
                    <button className="small-button bright" type='button'>Update</button>
                </Link>
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<HandleDeleteSpot currentSpotId={currentSpot.id} />}
                />
            </div>
        </div>

    )
}

//you can dispatch an empty object (reset to empty object)
//clear spots for current user
//in logout function / leaving a page - useEffect
//return anonymous function /dispatch clear action
