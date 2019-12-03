import React, {useState} from 'react';
import './App.css';
import CWL from './containers/CWL/CWL'
import CWL_war from './containers/CWL_war/CWL_war'
import packageJson from '../package.json'
import Sidebar from './navigation/sidebar/sidebar'
import {Switch, Route } from 'react-router-dom'
import HamburgerMenu from 'react-hamburger-menu'


function App() {
  const [open, setOpen] = useState(true); 


  return (
    <div className="App">
      <header className="App-header">
      <div className="Menu">
        <HamburgerMenu
          isOpen={open}
          menuClicked={() => setOpen(!open) }
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
            Made With <span  role="img" aria-label="love">❤️</span> By (_d0do_)  ©v{packageJson.version} 
          </p>
        </div>
      </header>
      <Sidebar open={open}></Sidebar>

      <Switch>
        <Route  path="/" component={CWL}></Route>
        <Route  path="/cwl/war/:tag" component={CWL_war}></Route>
      </Switch>

    </div>
  );
}

export default App;
