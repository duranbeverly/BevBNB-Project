import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { getReviewsCurrentThunk } from "../../store/reviews";
import CreateReview from "../Reviews/CreateReview";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import "./PastBooking.css"

export default function PastBookings({ booking }) {
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(getAllSpots()).then(dispatch(getReviewsCurrentThunk()))

    }, [dispatch])

    let spot = booking.Spot;
    let allSpots = Object.values(useSelector((state) => state.spots.allSpots))
    // let allPreviewImages = allSpots.map(spot => spot.previewImage)
    let preview = allSpots.find(spot => spot.id === booking.spotId)
    if (preview) {
        preview = preview.previewImage;
    }
    let startDate = booking.startDate
    let endDate = booking.endDate
    let user = useSelector((state) => state.session.user)
    let userSpotReview = Object.values(useSelector((state) => state.review.user))
    if (user) {
        userSpotReview = userSpotReview.filter((review) => review.userId === user.id && review.spotId === booking.spotId)
    }
    let userReviewed = userSpotReview.length;


    if (!spot) return <div>...Loading</div>

    return (
        <div className="past-trip-card">
            {/* <BookingSpotDetail spot={spot} /> */}
            <img style={{ height: '5rem', width: '5rem' }} src={preview}
                onClick={() => history.push(`/spots/${spot.id}`)}
            ></img>

            <div className="booking-text-container">
                <div className="booking-dates-container">
                    <h3 style={{ fontSize: '14px', margin: '0' }} className="booking-text"
                        onClick={() => history.push(`/spots/${spot.id}`)}>{spot.city}
                    </h3>
                    <div className="booking-dates">
                        <p style={{ fontSize: '12px', margin: '0' }}>
                            {new Date(startDate).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                            <span> - </span>
                            {new Date(endDate).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}

                        </p>
                    </div >
                </div>
                {!userReviewed && (<div >

                    <OpenModalButton buttonText="Post your Review"
                        modalComponent={<CreateReview spotInfo={spot} />}
                        style={{ fontSize: '10px', height: '1.5rem', borderRadius: '6px' }}
                    />
                </div>)}
            </div>
        </div>
    )
}
