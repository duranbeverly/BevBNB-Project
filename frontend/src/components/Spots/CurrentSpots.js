import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spots';
import { getCurrentUserSpots } from '../../store/spots';
import { CurrentSpotInfo } from './CurrentSpotInfo';
import "./Spot.css"

//you only get to this page if you have spots
//here you can just use Selector and read the current spots you and  display them

export const CurrentSpots = () => {
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)
    const user = useSelector(state => state.session.user);
    const currentSpotsObj = useSelector(state => state.spots.currentUserSpots)
    const [loading, setLoading] = useState(true)
    const [fetchedData, setFetchedData] = useState(null); // declare a state variable to store the fetched data

    const dispatch = useDispatch();

    useEffect(() => {

        setLoading(true);
        dispatch(getCurrentUserSpots())
            .then((data) => {
                setFetchedData(data); // update the state variable with the fetched data
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => console.error(err));
    }, [dispatch, user]);

    if (loading) {
        return <div className='loading'>Loading...</div>
    }

    let currentSpots = Object.values(currentSpotsObj)
    console.log("current spots derp: ", currentSpots)
    if (!spots) {
        return null
    }

    return (
        <>
            <h2>Manage Spots</h2>
            <div className='body-spots'>
                {currentSpots.map((currentSpot) => (
                    <CurrentSpotInfo currentSpot={currentSpot} key={currentSpot.id} />
                ))}
            </div>

        </>
    )
}
