import { Actions } from './types';

export const setSections = (sections: any[]) => ({
  type: Actions.setSections,
  payload: sections,
});
