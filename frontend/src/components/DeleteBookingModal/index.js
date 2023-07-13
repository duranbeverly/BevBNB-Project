import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/bookings";
import './DeleteBookingModal.css'

export default function DeleteBookingModal({ bookingId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteBookingThunk(bookingId)).then(closeModal)
    }

    return (
        <div className="modal-delete">
            <h2 className="delete-title">Confirm Delete</h2>
            <h3 className="delete-question">Are you sure you want to cancel this reservation?</h3>
            <button className="red-button" onClick={handleDelete}>Yes</button>
            <button className="grey-button" onClick={(closeModal)}>No</button>
        </div>
    )
}
