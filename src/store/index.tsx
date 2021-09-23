import { createContext, useContext } from 'react';
import { Actions } from './actions/types';
import { reducer } from './reducer';

const StoreContext = createContext();

export const Store = ({ initialState, children }) => (
  <StoreContext.Provider value={reducer(initialState, Actions.setSections)}>
    {children}
  </StoreContext.Provider>
);

export const useStoreValue = () => useContext(StoreContext);
