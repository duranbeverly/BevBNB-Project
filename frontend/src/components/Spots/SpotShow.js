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
import BookingModal from '../BookingModal';
import LoginFormModal from '../LoginFormModal';

export const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.allSpots[spotId])
    const review = useSelector(state => state.review.spot)
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    let reviewArray;
    if (review) {
        reviewArray = Object.values(review)
    }

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
            .then(() => setLoading(false))
            .then(() => dispatch(getAllReviews(spotId)));
    }, [dispatch, spotId]);




    if (loading) {
        return <div className='loading'>Loading...</div>
    }

    const userRepeat = reviewArray?.find(review => review.userId === user?.id)
    if (!reviewArray) return null
    if (!spot) {
        return null
    }

    return (
        <>
            <div className='single-spot-body'>
                <div className='wrapper'>
                    <h1>{spot?.name}</h1>
                    <h2 className='no-margin'>{spot?.city}, {spot?.state}, {spot?.country}</h2>
                    <div className='center'>
                        <div className='images'>
                            <img id="image" src={spot?.SpotImages[0]?.url}></img>
                            <div className='grid-images'>
                                <img className="small-image" src={spot?.SpotImages[1]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683912193/App%20Academy%20Front%20End%20Project/other_assets/coming_soon_dfutsv.jpg"} ></img>
                                <img className="small-image" src={spot?.SpotImages[2]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683912193/App%20Academy%20Front%20End%20Project/other_assets/coming_soon_dfutsv.jpg"} ></img>
                                <img className="small-image" src={spot?.SpotImages[3]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683912193/App%20Academy%20Front%20End%20Project/other_assets/coming_soon_dfutsv.jpg"}></img>
                                <img className="small-image" src={spot?.SpotImages[4]?.url || "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683912193/App%20Academy%20Front%20End%20Project/other_assets/coming_soon_dfutsv.jpg"}></img>
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
                                {user ? (
                                    <OpenModalButton
                                        buttonText="Reserve"
                                        className="reserve-button"
                                        modalComponent={<BookingModal spot={spot} />}
                                    />
                                ) : (

                                    <OpenModalButton
                                        buttonText="Reserve"
                                        className="reserve-button"
                                        modalComponent={<LoginFormModal />}
                                    />

                                )
                                }

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
                                <SpotShowReview key={review.id} review={review} spot={spot} user={user} spotId={spotId} />
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
