import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings";
import { getReviewsCurrentThunk } from "../../store/reviews";
import UpcomingBookings from "./UpcomingBookings";
import { useHistory } from "react-router-dom";
import "./UserBookings.css"
import PastBookings from "./PastBookings";



export default function UserBookings() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.session.user)
    const userBookings = Object.values(useSelector(state => state.bookings.user))

    useEffect(() => {
        if (!user) return history.push('/')
        dispatch(getReviewsCurrentThunk()).catch(() => { })
        dispatch(getUserBookingsThunk())
            .catch(() => setError("We couldn't load your trips. Please refresh and try again."))
            .finally(() => setLoading(false))
    }, [dispatch, user, history])

    let currentDate = new Date(new Date().setHours(0, 0, 0, 0))
    // a trip stays "upcoming" until it ends, so stays in progress don't vanish from both lists
    let futureBookings = userBookings
        .filter(booking => {
            let date = new Date(booking.endDate)
            return date >= currentDate
        })
        .sort((a, b) => {
            let aStart = new Date(a.startDate)
            let bStart = new Date(b.startDate)
            return aStart - bStart
        })

    let pastBookings = userBookings
        .filter(booking => {
            let endDate = new Date(booking.endDate);
            return endDate < currentDate;
        })
        .sort((a, b) => {
            let aStart = new Date(a.startDate);
            let bStart = new Date(b.startDate);
            return bStart - aStart;
        });



    if (!user) return null
    if (loading) return <div className="trips-wrapper"><h1>Loading...</h1></div>

    return (
        <div className="trips-wrapper">
            <h1>Trips</h1>
            {error && <p className="errors trips-error">{error}</p>}
            <div className="upcoming-trip-div">
                <h2> Upcoming Trips</h2>
                {futureBookings.length < 1 && (
                    <>
                        <h3>No trips booked...yet!</h3>
                        <p>Time to dust off your bags and start planning your next adventure</p>
                        <button id="booking-start-searching"
                            onClick={() => {
                                history.push('/')
                            }}
                        >Start searching</button>
                    </>)}
                {futureBookings.map(booking => {
                    return (<div key={booking.id} className="booking-tile">
                        <UpcomingBookings booking={booking} future={true} />

                    </div>)

                })}
            </div>
            <div className="past-trip-div">
                {userBookings.length > 0 && pastBookings.length > 0 && (<h2 >Where you've been</h2>)}
                <div className="bookings-container">
                    {pastBookings.map(booking => {
                        return (<div key={booking.id} className="booking-tile">
                            <PastBookings booking={booking} />

                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
