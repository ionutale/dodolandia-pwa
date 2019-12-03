import React, { useState, useReducer } from 'react';
import './App.css';
import CWL from './containers/CWL/CWL'
import CWL_war from './containers/CWL_war/CWL_war'
import packageJson from '../package.json'
import Sidebar from './navigation/sidebar/sidebar'
import { Switch, Route } from 'react-router-dom'
import HamburgerMenu from 'react-hamburger-menu'

export const CWLContext = React.createContext('CWL');
// Set up Initial State
const initialState = {
  cwl: null,
};

function reducer(state, action) {
  console.log(action);
  
  switch (action.type) {
      case 'UPDATE_CWL':
          return {
              cwl: action.data
          };


      default:
          return initialState;
  }
}

function App() {
  const [open, setOpen] = useState(true);
  const [sCWL, setSCWL] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateCwl = (sCwl) => {
    console.log("scwl : ", sCwl)
    setSCWL(sCwl)
  }

  return (

    <div className="App">
      <CWLContext.Provider value={{state, dispatch}}>
        <header className="App-header">
          <div className="Menu">
            <HamburgerMenu
              isOpen={open}
              menuClicked={() => setOpen(!open)}
              width={28}
              height={25}
              strokeWidth={1}
              rotate={0}
              color='white'
              borderRadius={0}
              animationDuration={0.2}
            />
          </div>

          <div className='Title'>
            Clan War League
          <p className="Version">
              Made With <span role="img" aria-label="love">❤️</span> By (_d0do_)  ©v{packageJson.version}
            </p>
          </div>
        </header>
        <Sidebar open={open} pCwl={updateCwl}></Sidebar>

        <Switch>
          <Route path="/" component={CWL}></Route>
          <Route path="/cwl/war/:tag" component={CWL_war}></Route>
        </Switch>
      </CWLContext.Provider>
    </div>
  );
}

export default App;
