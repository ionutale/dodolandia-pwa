import React from 'react';
import './App.css';
import CWL from './containers/CWL/CWL'
import packageJson from '../package.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Clan War League
        <p className="Version">
        Made With ❤️ By (_d0do_)  ©v{packageJson.version} 
          </p>
      </header>
      <CWL></CWL>
    </div>
  );
}

export default App;
