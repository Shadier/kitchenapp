import React from 'react';
import KitchenCalendar from './KitchenCalendar';
import Header from './Header';
import mailIcon from '../assets/images/email-send.png'
import '../assets/css/calendar.css';

class Principal extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      eventsToSend : []
    }

  }
  print = () => {
    console.log(this.state.eventsToSend);
  }
  callbackFunction = (dataFromCalendar) => {
    this.setState({eventsToSend: dataFromCalendar})
  }
  render(){
    return (
      <div>
        <Header/>
        <button id="btnSendEvents" className="kd-button" eventsToSend={this.state.eventsToSend} onClick={this.print}><img src={mailIcon} alt="Mail icon"/><p>SEND ALL EVENTS</p></button>
        <div className="principal-container">
          <KitchenCalendar parentCallback={this.callbackFunction}/>
        </div>
      </div>
    );
  }
}

export default Principal;