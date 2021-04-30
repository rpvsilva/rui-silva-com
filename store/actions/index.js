import { SET_SECTIONS } from './types';

export const setSections = sections => {
  return {
    type: SET_SECTIONS,
    payload: sections
  }
}