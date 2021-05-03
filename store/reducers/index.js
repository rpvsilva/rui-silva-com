import { combineReducers } from 'redux';
import sectionsReducer from './sectionsReducer';

export default combineReducers({
  sections: sectionsReducer,
});
