import { csrfFetch } from "./csrf";
export const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS"
export const CREATE_BOOKING = "bookings/CREATE_BOOKING"
export const USER_BOOKINGS = "bookings/USER_BOOKINGS"
export const EDIT_BOOKING = "bookings/EDIT_BOOKING"
export const DELETE_BOOKING = "bookings/DELETE_BOOKING"


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
    dispatch(loadBookings(id, data))
    return data;
}

// csrfFetch throws the Response on 4xx/5xx; turn that into an Error with a sentence a person can read
export const readableError = async (res, fallback) => {
    let message = fallback;
    try {
        const body = await res.json();
        const fieldErrors = body.errors ? Object.values(body.errors) : [];
        message = (body.errors && body.errors.message) || fieldErrors[0] || body.message || fallback;
        if (res.status === 401) message = "Please log in and try again.";
        const err = new Error(message);
        err.errors = body.errors || {};
        return err;
    } catch (e) {
        return Object.assign(new Error(message), { errors: {} });
    }
}

export const createBookingThunk = (id, data) => async dispatch => {
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
    try {
        await csrfFetch(`/api/bookings/${id}`, {
            method: "DELETE",
        })
    } catch (res) {
        if (!(res instanceof Response)) throw new Error("Couldn't reach the server. Please try again.");
        throw await readableError(res, "Something went wrong cancelling this booking. Please try again.");
    }
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
            newState.spot[action.id] = action.data.Bookings || action.data.allBookings || [];
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
            newState.user[action.data.id] = action.data
            return newState;

        case DELETE_BOOKING:
            newState = { ...state }
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            delete newState.user[action.id]
            return newState;

        default:
            return state;
    }
}
