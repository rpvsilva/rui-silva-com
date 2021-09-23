import { Actions } from 'store/actions/types';

export const initialState = {
  sections: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.setSections:
      return { ...state, sections: action.payload };
    default:
      return { ...state };
  }
};
