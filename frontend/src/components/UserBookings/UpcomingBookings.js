import { img } from "../../utils/img";
import { formatBookingDate } from "../../utils/dates";
import DeleteBookingModal from "../DeleteBookingModal";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import "./UpcomingBookings.css"

export default function UpcomingBookings({ booking, future }) {
    const history = useHistory()

    let spot = booking.Spot;
    // the bookings API already includes the spot's preview photo
    let preview = spot?.previewImage || spot?.SpotImages?.find(image => image.preview)?.url || spot?.SpotImages?.[0]?.url;
    let startDate = booking.startDate
    let endDate = booking.endDate
    // same rule as the API: once a stay has started it can't be cancelled
    let canCancel = new Date(startDate) > new Date()

    if (!spot) return <div>Loading...</div>

    return (
        <div className="future-trip-card">
            <img src={img(preview, 600)} alt={spot.name} loading="lazy"
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
                                    {formatBookingDate(startDate)}

                                </p>
                            </div>
                            <div className="booking-dates">
                                <p>Ends:
                                    <span> </span>
                                    {formatBookingDate(endDate)}
                                </p>
                            </div>
                            {canCancel ? (
                                <OpenModalButton
                                    buttonText="Cancel booking"
                                    modalComponent={<DeleteBookingModal bookingId={booking.id} />}
                                />
                            ) : (
                                <p className="trip-in-progress">Your stay is in progress</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
