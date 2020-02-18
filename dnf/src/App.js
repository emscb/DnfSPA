<<<<<<< Updated upstream
import React from 'react';
import logo from './logo.svg';
import './App.css';
=======
import React, { useState, useRef } from 'react';
import Template from './components/Template';
import List from './components/List';
import Insert from './components/Insert';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> Stashed changes

function App() {
  return (
<<<<<<< Updated upstream
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
    <div>
      <BrowserRouter>
        <Template>
          <Insert onInsert={onInsert}/>
          <List items={items}/>
        </Template>
      </BrowserRouter>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
