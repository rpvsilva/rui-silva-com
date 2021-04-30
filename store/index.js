import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import reducers from './reducers';

const makeStore = () => createStore(reducers);

export default createWrapper(makeStore);