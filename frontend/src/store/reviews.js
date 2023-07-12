import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { csrfFetch } from "./csrf"

//action type constants
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const CURR_REVIEWS = '/reviews/spotId'
//action creators

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

export function getReviewsCurrent(data) {
    return {
        type: CURR_REVIEWS,
        data
    }
}

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
        const data = await response.json()
        return data
    }
}

export const createReview = (review, spotId, user) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const data = await response.json()

        dispatch(addReview(data))
        data.User = user
        return data
    } else {
        const data = await response.json()
        return data
    }
}

export const getReviewsCurrentThunk = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current')
    const data = await response.json();
    dispatch(getReviewsCurrent(data))
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
            return newState
        }
        case CURR_REVIEWS: {
            let newState = { ...state }
            newState.user = {}
            action.data.Reviews.forEach((review) => {
                newState.user[review.id] = review;
            })

        }
        default:
            return state
    }
}
