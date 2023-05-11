import { csrfFetch } from "./csrf"
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
export const ADD_SPOT = 'spots/ADD_SPOT'
export const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE'
export const GET_CURRENT_SPOTS = 'spots/GET_CURRENT_SPOTS'
export const RESET_CURRENT_USER_SPOTS = 'spots/RESET_CURRENT_USER_SPOTS'
export const EDIT_SPOT = 'spots/EDIT_SPOT'
export const DELETE_SPOT = 'spots/DELETE_SPOT'
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

export const userSpots = (spots) => {
    return ({
        type: GET_CURRENT_SPOTS,
        spots

    })
}

export const editSpots = (spot) => {
    return ({
        type: EDIT_SPOT,
        spot
    })
}

export const deleteSpots = (spotId) => {
    return ({
        type: DELETE_SPOT,
        spotId
    })
}

export const resetCurrentUserSpots = () => {
    return ({
        type: RESET_CURRENT_USER_SPOTS
    })
}

//thunk action creators
export const getAllSpots = () => async (dispatch) => {

    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json()

        dispatch(loadSpots(data))
        console.log(data)
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
        // console.log("error in getting spot (╯°□°）╯︵ ┻━┻")
    }
}

export const createSpot = (spot) => async (dispatch) => {
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
        // console.log("error in getting spot ಥ_ಥ")
    }
}

export const createSpotImage = (image, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addSpotImage(data))
    } else {
        const data = await response.json()
        console.log("error in getting spot image ಥ_ಥ")
    }
}

export const getCurrentUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')
    if (response.ok) {
        const data = await response.json()
        dispatch(userSpots(data))
        // console.log("What we get when we try to fetch current spots", data)
        return data
    } else {
        // console.log("error in getting current user spots ಥ_ಥ")
    }
}



export const editSpot = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editSpots(data))
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteSpots(spotId))
        return { message: 'Successfully deleted' }
    }

}

export const spotsReducer = (state = { allSpots: {}, currentUserSpots: {} }, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { allSpots: {}, currentUserSpots: {} };
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState
        }
        case RECEIVE_SPOT: {
            const newState = { ...state, allSpots: { ...state, [action.spot.id]: action.spot } };
            return newState
        }
        case ADD_SPOT: {
            const newState = { ...state, allSpots: { ...state, [action.spot.id]: action.spot } };
            return newState
        }
        case ADD_SPOT_IMAGE: {
            const newSingleSpots = { ...state.singleSpots };
            if (newSingleSpots[action.spotId]) {
                newSingleSpots[action.spotId].SpotImages = [...newSingleSpots[action.spotId].SpotImages, action.image];
            }
            return { ...state, currentUserSpots: newSingleSpots };
        }
        case GET_CURRENT_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, currentUserSpots: { ...state.currentUserSpots } };
            action.spots.Spots.forEach((spot) => {
                newState.currentUserSpots[spot.id] = spot;
            });
            return newState
        }
        case RESET_CURRENT_USER_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, currentUserSpots: {} };
            return newState
        }
        case EDIT_SPOT: {
            return {
                ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot }, currentUserSpots: { ...state.currentUserSpots, [action.spot.id]: action.spot }
            }
        }
        case DELETE_SPOT: {
            let newState = { ...state, allSpots: { ...state.allSpots }, currentUserSpots: { ...state.currentUserSpots } }
            delete newState.currentUserSpots[action.spotId]
            delete newState.allSpots[action.spotId]
            return newState
        }
        default:
            return state;
    }
};
