import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import { SpotIndexItem } from './SpotIndexItem';
import "./Spot.css"

export const SpotIndex = () => {
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())

    }, [dispatch])

    return (
        <div>
            <div className='body-spots'>
                {spots
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((spot) => (
                        <SpotIndexItem spot={spot} key={spot.id} />
                    ))}
            </div>
        </div>
    )
}
