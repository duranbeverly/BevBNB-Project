import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { getReviewsCurrentThunk } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateReview from "../Reviews/CreateReview";
import DeleteBookingModal from "../DeleteBookingModal";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import "./UpcomingBookings.css"

export default function UpcomingBookings({ booking, future }) {
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(getAllSpots()).then(dispatch(getReviewsCurrentThunk()))
    }, [dispatch])

    let spot = booking.Spot;
    let allSpots = Object.values(useSelector((state) => state.spots.allSpots))
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
        <div className="future-trip-card">
            <img style={{ height: '12rem', width: '15rem', borderRadius: '10px 0 0 10px' }} src={preview}
                onClick={() => history.push(`/spots/${spot.id}`)}
            />

            <div className="ubooking-text-container">
                <h3
                    style={{ margin: '0' }}
                    className="booking-text"
                    onClick={() => history.push(`/spots/${spot.id}`)}>{spot.city}
                </h3>
                <h4 className="booking-text"
                    style={{ fontSize: '14px', margin: '0' }}
                    onClick={() => history.push(`/spots/${spot.id}`)}>{spot.name}
                </h4>
                <div id="booking-dates-container">
                    {future && (
                        <div>
                            <div className="booking-dates">
                                <p>Reservation begins:
                                    <span> </span>
                                    {new Date(startDate).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}

                                </p>
                            </div>
                            <div className="booking-dates">
                                <p>Ends:
                                    <span> </span>
                                    {new Date(endDate).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <OpenModalButton
                                buttonText="Cancel booking"
                                modalComponent={<DeleteBookingModal bookingId={booking.id} />}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
