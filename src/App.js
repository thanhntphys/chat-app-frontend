
import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';

import Login from './components/Login/Login'
import ChatBody from './components/ChatBody/ChatBody';
import Nav from './components/Nav/Nav'



function App() {

  const { isLoggedIn } = useSelector(state => state.users)

  return (
    <>
      {isLoggedIn ?
        (
          <div className="__main">
            <Nav />
            <ChatBody />
          </div>
        ) :
        <Login />}
    </>
  );
}

export default App;
