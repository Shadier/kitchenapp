import React from 'react';
import KitchenCalendar from './components/KitchenCalendar';
import Header from './components/Header';
import './App.css';

import mailIcon from './assets/images/email-send.png'



function App() {
  
  return (
    <>
      <Header/>
      <button id="btnSendEvents" className="kd-button"><img src={mailIcon} alt="Mail icon"/><p>SEND ALL EVENTS</p></button>
      <div className="principal-container">
        <KitchenCalendar/>
      </div>
    </>
  );
  
}

export default App;

