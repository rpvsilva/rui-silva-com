import { SET_SECTIONS } from '../actions/types';

export const initialState = {
  sections: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SECTIONS: return { ...state, sections: action.payload };
  default: return { ...state };
  }
};