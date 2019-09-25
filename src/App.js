import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment) 
function App() {
  return (
    <Calendar
      startAccessor="start"
      endAccessor="end"
    />
  );
}

export default App;
