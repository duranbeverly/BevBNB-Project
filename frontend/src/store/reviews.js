import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { csrfFetch } from "./csrf"

//action type constants
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
//action creators

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})
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
    console.log("in the thunk: ", review)
    console.log("in the thunk spot id: ", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const data = await response.json()
        console.log("this is what we got from fetch: ", data)
        dispatch(addReview(data))
        return data
    } else {
        console.log("grabbing data failed T-T")
    }
}
//create a reducer

export const reviewsReducer = (state = {}, action) => {
    console.log("in the reducer state: ", state)
    console.log("in the reducer action: ", action)
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
        default:
            return state
    }
}
