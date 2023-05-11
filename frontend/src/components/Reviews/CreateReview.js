import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./CreateReview.css"

function CreateReview({ spot, user }) {


    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const [activeRating, setActiveRating] = useState(0);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        let errors = {}
        if (stars < 1) errors.stars = "Stars can't be empty"
        if (review.length < 10) errors.review = "Review must be at least 10 characters long"

        setErrors(errors)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (Object.values(errors).length > 0) {
            alert("Please fix the errors you have")

        } else {
            let spotId = spot.id
            let reviews = {
                stars,
                review,
            };

            await dispatch(createReview(reviews, spotId)).then(closeModal)
                .then(() => {
                    setStars(0);
                    setReview("");
                    setErrors({});
                    setActiveRating(0);
                })
                .catch(error => {
                    setServerError(error.message)
                })
        }



    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2 className="review-title">How was your stay?</h2>
            {serverError && <p className="server-error">{serverError}</p>}
            <label className="review-label">
                Review:
                <textarea
                    placeholder="Leave your review here..."
                    className="review-input long-text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>
            <label className="review-label">
                Stars:
                <div className="rating-input">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(1)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(1)}
                    >
                        {activeRating >= 1 ?
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                            :
                            <i className={`fa-regular fa-star fa-2xl ${activeRating >= 1 ? 'filled' : ''}`}></i>
                        }
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(2)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(2)}
                    >
                        {activeRating >= 2 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}

                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(3)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(3)}
                    >
                        {activeRating >= 3 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(4)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(4)}
                    >
                        {activeRating >= 4 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(5)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(5)}
                    >
                        {activeRating >= 5 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}
                    </div>
                </div>
            </label>
            <button disabled={Object.values(errors).length > 0} className="review-button" type="submit">Submit Your Review</button>
        </form>
    );
}

export default CreateReview;
