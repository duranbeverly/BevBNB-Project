import { csrfFetch } from "./csrf"
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
export const ADD_SPOT = 'spots/ADD_SPOT'
export const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE'

//Action creator for loading spots
export const loadSpots = (spots) => {
    return ({
        type: LOAD_SPOTS,
        spots
    })
}

export const receiveSpots = (spot) => {

    return ({
        type: RECEIVE_SPOT,
        spot
    })
}

export const addSpot = (spot) => {
    return ({
        type: ADD_SPOT,
        spot
    })
}

export const addSpotImage = (image) => {
    return ({
        type: ADD_SPOT_IMAGE,
        image
    })
}

//thunk action creators
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json()
        dispatch(loadSpots(data))
        return data //check if this is necessary
    }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(receiveSpots(data))
        return data
    } else {
        console.log("error in getting spot (╯°□°）╯︵ ┻━┻")
    }
}

export const createSpot = (spot) => async (dispatch) => {
    console.log("inside the thunk to create spot: ", spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addSpot(data))
        return data.id
    } else {
        const data = await response.json()
        console.log(data)
        console.log("error in getting spot ಥ_ಥ")
    }
}

export const createSpotImage = (image, spotId) => async (dispatch) => {
    console.log("image in thunk: ", image)
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    })
    if (response.ok) {
        const data = await response.json()
        console.log("what we get after our post attempt to make an image: ", data)
        dispatch(addSpotImage(data))
    } else {
        const data = await response.json()
        console.log("what we get after our post attempt to make an image: ", data)
        console.log("error in getting spot ಥ_ಥ")
    }
}

//reducer
export const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            return newState;
        }
        case RECEIVE_SPOT: {
            return { [action.spot.id]: action.spot }
        }
        case ADD_SPOT: {
            return { ...state, [action.spot.id]: action.spot }
        }
        case ADD_SPOT_IMAGE: {
            console.log("in the reducer what is state: ", state)
            console.log("in the reducer what is action/payload: ", action)
            let newState = { ...state }
            newState.SpotImages = []
            newState.SpotImages.push(action.image)
            console.log("newState: ", newState)
            return newState
        }
        default:
            return state
    }
}
