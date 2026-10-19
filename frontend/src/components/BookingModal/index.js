import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { createBookingThunk, getUserBookingsThunk, readableError } from "../../store/bookings";
import { toDateOnly } from "../../utils/dates";
import "./BookingModal.css"
import "react-datepicker/dist/react-datepicker.css";

export default function BookingModal({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // Default to tomorrow: a trip that starts today counts as already started and can't be cancelled.
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const [startDate, setStartDate] = useState(tomorrow);
    // Calculate minimum date for the end date picker
    const minEndDate = startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null;
    const [endDate, setEndDate] = useState(minEndDate);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const { closeModal } = useModal();

    useEffect(() => {
        let errors = {};
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"

        setErrors(errors);

    }, [startDate, endDate])


    useEffect(() => {
        setEndDate(minEndDate)
    }, [startDate])

    function handleSubmit(e) {
        setHasSubmitted(true)
        e.preventDefault();

        if (!startDate || !endDate) return;

        dispatch(createBookingThunk(spot.id, { startDate: toDateOnly(startDate), endDate: toDateOnly(endDate) }))
            .then(() => dispatch(getUserBookingsThunk()))
            .then(() => {
                closeModal()
                history.push('/bookings')
            })
            .catch(async (res) => {
                const error = res instanceof Response
                    ? await readableError(res, "Something went wrong booking this spot. Please try again.")
                    : Object.assign(new Error("Couldn't reach the server. Please try again."), { errors: {} });

                let newErrors = {};
                if (error.errors.startDate) newErrors.start = error.errors.startDate;
                if (error.errors.endDate) newErrors.end = error.errors.endDate;
                if (!newErrors.start && !newErrors.end) newErrors.message = error.message;
                setErrors(newErrors);
            })
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
                    onChange={(date) => {
                        setStartDate(date);
                        if (date && endDate && endDate <= date) setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
                    }}
                    minDate={new Date()}
                    popperProps={{ strategy: "fixed" }}
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
                    popperProps={{ strategy: "fixed" }}
                />
                <i className="fa-regular fa-calendar"></i>
            </label>
            <button type="submit" className="review-button">Reserve Spot</button>
        </form>
    )
}
