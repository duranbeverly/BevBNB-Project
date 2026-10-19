import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/bookings";
import './DeleteBookingModal.css'

export default function DeleteBookingModal({ bookingId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)

    const handleDelete = (e) => {
        e.preventDefault();
        setError(null)
        setPending(true)

        dispatch(deleteBookingThunk(bookingId))
            .then(closeModal)
            .catch((err) => {
                setError(err.message)
                setPending(false)
            })
    }

    return (
        <div className="modal-delete">
            <h2 className="delete-title">Cancel Reservation</h2>
            <h3 className="delete-question">Are you sure you want to cancel this reservation?</h3>
            {error && <p className="errors delete-error">{error}</p>}
            <button className="red-button" onClick={handleDelete} disabled={pending}>{pending ? "Cancelling..." : "Yes, cancel it"}</button>
            <button className="grey-button" onClick={closeModal}>No, keep it</button>
        </div>
    )
}
