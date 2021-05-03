import { HYDRATE } from 'next-redux-wrapper';
import { SET_SECTIONS } from '../actions/types';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE: return [...state];
  case SET_SECTIONS: return [...action.payload];
  default: return [...state];
  }
};

export default reducer;
