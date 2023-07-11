import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./BookingModal.css"
import "react-datepicker/dist/react-datepicker.css";

export default function BookingModal({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    // Calculate minimum date for the end date picker
    const minEndDate = startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null;

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2>Book your reservation:</h2>
            <label className="review-label inside">Start Date
                <DatePicker
                    selected={startDate}
                    className="date-input"
                    onChange={(date) => setStartDate(date)}
                />
                <i className="fa-regular fa-calendar"></i>
            </label>
            <label className="review-label inside">
                End Date
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
