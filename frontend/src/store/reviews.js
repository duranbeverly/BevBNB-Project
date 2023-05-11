import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { csrfFetch } from "./csrf"

//action type constants
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
//action creators

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

export const deleteReviews = (reviewId) => {
    return ({
        type: DELETE_REVIEW,
        reviewId
    })
}
//thunk action creators

export const getAllReviews = (spotId) => async (dispatch) => {

    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadReviews(data))
        return data
    } else {
        console.log("grabbing data failed T-T")
    }
}

export const createReview = (review, spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const data = await response.json()

        dispatch(addReview(data))
        return data
    } else {
        console.log("grabbing data failed T-T")
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReviews(reviewId))
        return { message: 'Successfully deleted' }
    }

}
//create a reducer

export const reviewsReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {}
            action.reviews.Reviews.forEach((review) => {
                newState[review.id] = review;
            })

            return newState;
        }
        case ADD_REVIEW: {
            return { ...state, [action.review.id]: action.review }
        }
        case DELETE_REVIEW: {
            let newState = { ...state }
            delete newState[action.reviewId]
            console.log("this is the state of things in reviews in reviews reducer: ", action, state)
            return newState
        }
        default:
            return state
    }
}
