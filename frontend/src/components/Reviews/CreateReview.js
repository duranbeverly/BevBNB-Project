import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import "./CreateReview.css"

function CreateReview({ spotId }) {
    const [stars, setStars] = useState(5);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const dispatch = useDispatch();


    useEffect(() => {
        let errors = {}
        if (stars.length < 1) errors.stars = "Stars can't be empty"
        if (review.length < 10) errors.review = "Review must be at least 10 characters long"
        setErrors(errors)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = {
            stars,
            review,
        };

        // await dispatch(createReview(review, spotId));
        setStars(5);
        setReview("");
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2 className="review-title">Leave a Review</h2>
            <label className="review-label">
                Stars:
                <input
                    className="review-input"
                    type="number"
                    min={1}
                    max={5}
                    value={stars}
                    onChange={(e) => setStars(parseInt(e.target.value))}
                />
            </label>
            <label className="review-label">
                Review:
                <textarea
                    className="review-input"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>
            <button className="review-button" type="submit">Submit Review</button>
        </form>
    );
}

export default CreateReview;
