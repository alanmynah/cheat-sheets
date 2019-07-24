import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ClassFibonacci from './ClassFibonacci';
import HooksFibonacci from './HooksFibonacci';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1>Welcome to Fullstack example</h1>
          <Link to='/'>Class Fibonacci</Link>
          <Link to='/hooks'>Hooks Fibonacci</Link>
        </header>
        <>
          <Route exact path='/' component={ClassFibonacci} />
          <Route path='/hooks' component={HooksFibonacci} />
        </>
      </div>
    </BrowserRouter>
  );
}

export default App;
