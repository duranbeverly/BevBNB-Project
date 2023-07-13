import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings";
import UpcomingBookings from "./UpcomingBookings";
import { useHistory } from "react-router-dom";
import "./UserBookings.css"
import PastBookings from "./PastBookings";
import DeleteBookingModal from "../DeleteBookingModal";



export default function UserBookings() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [loading, setLoading] = useState(true);
    const userBookings = Object.values(useSelector(state => state.bookings.user))
    console.log("user Bookings here: ", userBookings) 

    useEffect(() => {
        dispatch(getUserBookingsThunk()).then(() => {
            setLoading(false)
        })
    }, [dispatch])

    let currentDate = new Date(new Date().setHours(0, 0, 0, 0))
    let futureBookings = userBookings
        .filter(booking => {
            let date = new Date(booking.startDate)
            return date >= currentDate
        })
        .sort((a, b) => {
            let aStart = new Date(a.startDate)
            let bStart = new Date(b.startDate)
            return aStart - bStart
        })

    console.log("future bookings", futureBookings)

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



    if (loading) return <div><h1>...Loading</h1></div>

    return (
        <div className="trips-wrapper">
            <h1>Trips</h1>
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
