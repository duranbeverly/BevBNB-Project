import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import sessionReducer from "./session";
import { spotsReducer } from "./spots";
import { reviewsReducer } from "./reviews";
import bookingsReducer from "./bookings";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: spotsReducer,
  review: reviewsReducer,
  bookings: bookingsReducer
});

let enhancer;

if (import.meta.env.PROD) {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
