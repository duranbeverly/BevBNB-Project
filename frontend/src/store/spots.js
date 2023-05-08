
const LOAD_SPOTS = 'spots/LOAD_SPOTS'

//Action creator for laoding spots
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

//thunk action creators
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
}

//reducer
