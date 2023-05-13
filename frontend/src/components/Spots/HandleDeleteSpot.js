import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spots';
import { getCurrentUserSpots } from "../../store/spots";
import "./HandleDelete.css"


export const HandleDeleteSpot = ({ currentSpotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleDelete = (e) => {

        e.preventDefault();
        dispatch(deleteSpot(currentSpotId)).then(() => dispatch(getCurrentUserSpots())).then(closeModal)
    }


    return (
        <>
            <div className="modal-delete">
                <h2 className="delete-title">Confirm Delete</h2>
                <h3 className="delete-question">Are you sure you want to remove this spot from the listings?</h3>
                <button className="red-button" type="button" onClick={handleDelete}>Yes</button>
                <button className="grey-button" type="button" onClick={(closeModal)}>No</button>
            </div>
        </>
    )
}
