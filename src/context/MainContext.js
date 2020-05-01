import React, { useState, useCallback } from 'react';

export const APIMainContext = React.createContext({
  error: null
});

export default function APIMainProvider({ children }) {
  const [error, setError]= useState(null);
  const setErr = (err) => setError(err)

  const contextValue = {
    error,
    addError: useCallback((err) => setErr(err), []),
    removeError: useCallback(() => setErr(null), [])
  };

  return (
    <APIMainContext.Provider value={contextValue}>
      {children}
    </APIMainContext.Provider>
  );
}