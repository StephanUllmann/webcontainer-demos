import { useState } from 'react';
import './App.css';
import LightBulb from './components/LightBulb';
import Toggle from './components/Toggle';
import GrandMotherComponent from './components/GrandMotherComponent';
import LightContextProvider from './context/LightContext';

function App() {
  return (
    <>
      <h1>Recap</h1>
      <div className='flex'>
        <LightContextProvider>
          <LightBulb />
          <GrandMotherComponent />
          <Toggle label='click here' name='clicked' />
        </LightContextProvider>
      </div>
    </>
  );
}

export default App;
