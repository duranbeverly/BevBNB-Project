import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from '../../store/reviews';
import { getSingleSpot } from '../../store/spots';
import "./HandleDelete.css"


export const DeleteReview = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault();

        // refresh the spot too so the star average and review count drop the deleted review
        dispatch(deleteReview(reviewId))
            .then(() => spotId && dispatch(getSingleSpot(spotId)))
            .then(closeModal)
            .catch(closeModal)
    }


    return (
        <>
            <div className="modal-delete">
                <h2 className="delete-title">Confirm Delete</h2>
                <h3 className="delete-question">Are you sure you want to delete this review?</h3>
                <button className="red-button" type="button" onClick={handleDelete}>Yes</button>
                <button className="grey-button" type="button" onClick={(closeModal)}>No</button>
            </div>
        </>
    )
}
