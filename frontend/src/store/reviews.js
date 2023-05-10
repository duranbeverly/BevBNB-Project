import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { csrfFetch } from "./csrf"

//action type constants
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
//action creators

export const loadReviews = () => ({
    type: LOAD_REVIEWS,

})

export const addReview = (spotId) => ({
    type: ADD_REVIEW,
    spotId
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

export const createReview = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/spots/${spotId} / reviews}`)
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
        default:
            return state
    }
}
