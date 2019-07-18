import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          This is the frontend for fullstack-example.
          <a
            className='App-link'
            href='https://github.com/alanmynah/cheat-sheets/tree/master/Docker/fullstack-example'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            The sourcecode is here.
          </a>
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
