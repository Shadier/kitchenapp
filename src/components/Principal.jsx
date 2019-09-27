import React from 'react';
import KitchenCalendar from './KitchenCalendar';
import Header from './Header';
import Alert from './AlertOK';
import mailIcon from '../assets/images/email-send.png'
import '../assets/css/calendar.css';

class Principal extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      eventsToSend : [],
      isAlertOpen: false, 
      alertTitle: "Success",
      alertSubtitle: "Events sended successfully"
    }

  }
  print = () => {
    this.closeAlert()
    console.log(this.state.eventsToSend);
  }
  callbackFunction = (dataFromCalendar) => {
    this.setState({eventsToSend: dataFromCalendar})
  }
  
  closeAlert = (event) => {
    this.setState({
        isAlertOpen: !this.state.isAlertOpen
    });
  }
  render(){
    return (
      <div>
        <Header/>
        <Alert 
          title={this.state.alertTitle}
          subtitle={this.state.alertSubtitle}
          show={this.state.isAlertOpen} 
          continue={this.closeAlert}
        /> 
        <div className="body-canvas">
          <button id="btnSendEvents" className="kd-button" eventsToSend={this.state.eventsToSend} onClick={this.print}><img src={mailIcon} alt="Mail icon"/><p>SEND ALL EVENTS</p></button>
          <div className="principal-container">
            <KitchenCalendar parentCallback={this.callbackFunction}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Principal;