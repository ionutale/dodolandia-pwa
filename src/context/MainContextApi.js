// src/common/hooks/useAPIDocs/index.js
import { useContext } from 'react';
import { APIMainContext } from './MainContext';

function MainContextApi() {
  const { 
    error, addError, removeError
  } = useContext(APIMainContext);
  return { 
    error, addError, removeError
  };
}

export default MainContextApi;