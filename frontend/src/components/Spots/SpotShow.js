import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleSpot } from '../../store/spots';
import * as sessionActions from '../../store/session';
import "./SpotShow.css"
import { getAllReviews } from '../../store/reviews';
import { SpotShowReview } from './SpotShowReview';
import OpenModalButton from '../OpenModalButton';
import CreateReview from '../Reviews/CreateReview';

export const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.allSpots[spotId])
    const review = useSelector(state => state.review)
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)



    let reviewArray;
    if (review) {
        reviewArray = Object.values(review)
    }


    const userRepeat = reviewArray?.find(review => review.userId === user?.id)


    useEffect(() => {

        dispatch(getSingleSpot(spotId))
            .then(() => setLoading(false))
            .then(() => dispatch(getAllReviews(spotId)));
    }, [dispatch, spotId]);

    if (loading) {
        return <div className='loading'>Loading...</div>
    }

    if (!reviewArray) return null
    if (!spot) {
        return null
    }

    return (
        <>
            <div className='single-spot-body'>
                <div className='wrapper'>
                    <h1>{spot?.name}</h1>
                    <h2>{spot?.city}, {spot?.state}, {spot?.country}</h2>
                    <div className='center'>
                        <div className='images'>
                            <img id="image" src={spot?.SpotImages[0]?.url}></img>
                            <div className='grid-images'>
                                <img className="small-image" src={spot?.SpotImages[1]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683660910/App%20Academy%20Front%20End%20Project/other_assets/photo_coming_soon_oxrmin.png"} ></img>
                                <img className="small-image" src={spot?.SpotImages[2]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683660910/App%20Academy%20Front%20End%20Project/other_assets/photo_coming_soon_oxrmin.png"} ></img>
                                <img className="small-image" src={spot?.SpotImages[3]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683660910/App%20Academy%20Front%20End%20Project/other_assets/photo_coming_soon_oxrmin.png"}></img>
                                <img className="small-image" src={spot?.SpotImages[4]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683660910/App%20Academy%20Front%20End%20Project/other_assets/photo_coming_soon_oxrmin.png"}></img>
                            </div>
                        </div>

                    </div>
                    <div className='information-spot'>
                        <div className='top-info'>
                            <div className='host-info'>

                                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                <p>{spot.description}</p>
                            </div>
                            <div className='reserve-area'>
                                <div className='top-area-reserve'>
                                    <h2>{`$${spot.price}`} <span className='small-text'>night</span></h2>
                                    <div className='top-right-reserve'>
                                        <div className='rating'>
                                            <i className="fa-solid fa-star fa-sm move-up-less" style={{ color: '#51563d' }}></i>
                                            <p>{`${spot.avgStarRating?.toFixed(2) ?? 'New'} `}</p>
                                            <span className='dot-from-hell-small'>.</span>
                                        </div>
                                        <p>{`${spot.numReviews} review${spot.numReviews !== 1 ? 's' : ''}`}</p>
                                    </div>
                                </div>
                                <button className="reserve-button" type='button' onClick={(e) => { alert('Feature coming soon') }}>Reserve</button>
                            </div>
                        </div>

                    </div>
                    <div className='reviews'>


                        {user && user?.firstName != spot.Owner.firstName && !userRepeat ? (
                            <>
                                <div className='top-reviews'>
                                    <div className='rating'>
                                        <i className="fa-solid fa-star move-up" style={{ color: '#51563d' }}></i>
                                        <h2>{`${spot.avgStarRating?.toFixed(2) ?? 'New'} `}</h2>
                                        <span className='dot-from-hell'>.</span>
                                        <h2>{`${spot.numReviews} review${spot.numReviews !== 1 ? 's' : ''}`}</h2>
                                    </div>
                                </div>
                                {spot.numReviews === 0 && <p>Be the first to post a review!</p>}

                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    modalComponent={<CreateReview spot={spot} user={user} />}
                                />
                            </>


                        ) : (
                            <>
                                <div className='top-reviews'>
                                    <div className='rating'>
                                        <i className="fa-solid fa-star move-up" style={{ color: '#51563d' }}></i>
                                        <h2 className='reviews-title-div'>{`${spot.avgStarRating?.toFixed(2) ?? 'New'} `}</h2>
                                        <span className='dot-from-hell'>.</span>
                                        <h2>{`${spot.numReviews} review${spot.numReviews !== 1 ? 's' : ''}`}</h2>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                    <div>

                        {reviewArray
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((review) => (
                                <SpotShowReview key={review.id} review={review} spot={spot} user={user} />
                            ))
                        }
                    </div>

                </div>
                <div>

                </div>
            </div >
            <div>

            </div>
        </>
    )
}
