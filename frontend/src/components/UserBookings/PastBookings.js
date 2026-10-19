import { img } from "../../utils/img";
import { formatBookingDate } from "../../utils/dates";
import { useSelector } from "react-redux";
import CreateReview from "../Reviews/CreateReview";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import "./PastBooking.css"

export default function PastBookings({ booking }) {
    const history = useHistory()

    let spot = booking.Spot;
    // the bookings API already includes the spot's preview photo
    let preview = spot?.previewImage || spot?.SpotImages?.find(image => image.preview)?.url || spot?.SpotImages?.[0]?.url;
    let startDate = booking.startDate
    let endDate = booking.endDate
    let user = useSelector((state) => state.session.user)
    let userSpotReview = Object.values(useSelector((state) => state.review.user))
    if (user) {
        userSpotReview = userSpotReview.filter((review) => review.userId === user.id && review.spotId === booking.spotId)
    }
    let userReviewed = userSpotReview.length;


    if (!spot) return <div>Loading...</div>

    return (
        <div className="past-trip-card">
            {/* <BookingSpotDetail spot={spot} /> */}
            <img style={{ height: '5rem', width: '5rem' }} src={img(preview, 200)} alt={spot?.name} loading="lazy"
                onClick={() => history.push(`/spots/${spot.id}`)}
            ></img>

            <div className="booking-text-container">
                <div className="booking-dates-container">
                    <h3 style={{ fontSize: '14px', margin: '0' }} className="booking-text"
                        onClick={() => history.push(`/spots/${spot.id}`)}>{spot.city}
                    </h3>
                    <div className="booking-dates">
                        <p style={{ fontSize: '12px', margin: '0' }}>
                            {formatBookingDate(startDate)}
                            <span> - </span>
                            {formatBookingDate(endDate)}

                        </p>
                    </div >
                </div>
                {!userReviewed && (<div >

                    <OpenModalButton buttonText="Post Your Review"
                        modalComponent={<CreateReview spot={spot} user={user} />}
                        style={{ fontSize: '10px', height: '1.5rem', borderRadius: '6px' }}
                    />
                </div>)}
            </div>
        </div>
    )
}
