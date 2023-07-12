import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { createBookingThunk, getUserBookingsThunk } from "../../store/bookings";
import "./BookingModal.css"
import "react-datepicker/dist/react-datepicker.css";

export default function BookingModal({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const { closeModal } = useModal();

    useEffect(() => {
        let errors = {};
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"

        setErrors(errors);

    }, [startDate, endDate])

    // Calculate minimum date for the end date picker
    const minEndDate = startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null;

    useEffect(() => {
        setEndDate(minEndDate)
    }, [startDate])

    function handleSubmit(e) {
        setHasSubmitted(true)
        e.preventDefault();

        if (Object.values(errors).length) return;
        let res = dispatch(createBookingThunk(spot.id, { startDate, endDate })).then(dispatch(getUserBookingsThunk())).then(closeModal)
            // .then(() => history.push('/bookings/current'))
            .catch(async (error) => {
                console.log(error);
                let serverErrors = {};

                if (error instanceof Response) {
                    // Parse the error response body
                    const errorBody = await error.json();
                    serverErrors = errorBody.errors;
                } else {
                    serverErrors.message = "An error occurred";
                }

                let newErrors = {};

                if (serverErrors.message === "Authentication required") {
                    newErrors.message = "You must be logged in to request a booking";
                }
                if (serverErrors.endDate) {
                    newErrors.end = serverErrors.endDate;
                }
                if (serverErrors.startDate) {
                    newErrors.start = serverErrors.startDate;
                }
                if (!serverErrors) {
                    newErrors.message = "You cannot book a reservation for your own spot.";
                }

                setErrors(newErrors);
            });



    }



    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2>Book your reservation:</h2>
            {hasSubmitted && errors.message && (<p className="errors">{errors.message}</p>)}
            <label className="review-label inside">
                <div className="errors-inside">
                    Start Date
                    {hasSubmitted && errors.start && (<p className="errors">{errors.start}</p>)}
                </div>
                <DatePicker
                    selected={startDate}
                    className="date-input"
                    onChange={(date) => setStartDate(date)}
                />
                <i className="fa-regular fa-calendar"></i>
            </label>
            <label className="review-label inside">
                <div className="errors-inside">
                    End Date
                    {hasSubmitted && errors.end && (<p className="errors">{errors.end}</p>)}

                </div>
                <DatePicker
                    selected={endDate}
                    className="date-input"
                    onChange={(date) => setEndDate(date)}
                    minDate={minEndDate}
                />
                <i className="fa-regular fa-calendar"></i>
            </label>
            <button type="submit" className="review-button">Reserve Spot</button>
        </form>
    )
}
