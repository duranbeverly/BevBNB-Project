
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

export const addSpotImage = (images) => {
    return ({
        type: ADD_SPOT_IMAGE,
        images
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
    const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addSpot(data))
        return data.id
    } else {
        console.log("error in getting spot ಥ_ಥ")
    }
}

export const createSpotImage = (image) => async (dispatch) => {
    const response = await fetch(`/api/${image}/images`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(image)
    })
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
            return { ...state, ...action.image }
        }
        default:
            return state
    }
}
