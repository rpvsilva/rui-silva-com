import { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext()

export const Store = ({ initialState, reducer, children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export const useStoreValue = () => useContext(StoreContext);