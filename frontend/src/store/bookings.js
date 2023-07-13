import { csrfFetch } from "./csrf";
export const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS"
export const CREATE_BOOKING = "bookings/CREATE_BOOKING"
export const USER_BOOKINGS = "bookings/USER_BOOKINGS"
export const EDIT_BOOKING = "bookings/EDIT_BOOKING"
export const DELETE_BOOKING = "bookings_DELETE_BOOKING"


export const loadBookings = (id, data) => {
    return {
        type: LOAD_BOOKINGS,
        data,
        id
    }
}

export const createBooking = (data, id) => {
    return ({
        type: CREATE_BOOKING,
        data,
        id
    })
}

export const userBookings = (data) => {
    return {
        type: USER_BOOKINGS,
        data
    }
}


export const deleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}

export const getBookingsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)
    const data = await response.json()
    dispatch(loadBookings(data, id))
    return data;
}

export const createBookingThunk = (id, data) => async dispatch => {
    console.log("in thunk ", id, data)
    const response = await csrfFetch(`/api/spots/${id}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createBooking(data, id))
        return data;
    }
    else {
        const error = await response.json()
        return error;
    }
}

export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current')
    const data = await response.json();
    dispatch(userBookings(data))
    return data;
}

export const editBookingThunk = (id, data) => async dispatch => {

}

export const deleteBookingThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: "DELETE",
    })
    const data = await response.json();
    dispatch(deleteBooking(id))
}

const initialState = { user: {}, spot: {} }


export default function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_BOOKINGS:
            newState = { ...state }
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            action.data.Bookings.forEach(booking => {
                newState.spot[action.id] = booking;
            })
            return newState;
        case USER_BOOKINGS:
            newState = { ...state }
            newState.spot = { ...newState.spot }
            newState.user = {};
            action.data.Bookings.forEach(booking => {
                newState.user[booking.id] = booking;
            })
            return newState;
        case CREATE_BOOKING:
            newState = { ...state }
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            newState.spot[action.data.id] = action.data
            newState.user[action.data.id] = action.data
            return newState;

        case DELETE_BOOKING:
            newState = { ...state }
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            delete newState.user[action.id]
            delete newState.spot[action.id]
            return newState;

        default:
            return state;
    }
}
