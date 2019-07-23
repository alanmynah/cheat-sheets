import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          This is the frontend of{' '}
          <a
            className='App-link'
            href='https://github.com/alanmynah/cheat-sheets/tree/master/Docker/fullstack-example'
            target='_blank'
            rel='noopener noreferrer'
          >
            dev-prod-container-example.
          </a>
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Oh yeah, learn React!
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
