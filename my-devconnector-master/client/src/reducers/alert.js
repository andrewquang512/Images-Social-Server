import { SET_ALERT, REMOVE_ALERT } from '../actions/types.js';
const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // ? state is immutable so we have to include any other state that's already there
      // ? => using ...state
      // ? data is the payload
      // ? and return it as the new state - new initialState
      return [...state, payload];
    case REMOVE_ALERT:
      // ? return the steverything but without the id-payload removed
      // ? and return it as the new state - new initialState
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
