import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment) 
function App() {
  return (
    <p>Kitchen App</p>
  );
}

export default App;
