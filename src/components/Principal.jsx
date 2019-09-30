import React from 'react';
import KitchenCalendar from './KitchenCalendar';
import Header from './Header';
import AlertOK from './AlertOK';
import AlertYN from './AlertYN';
import mailIcon from '../assets/images/email-send.png'
import '../assets/css/calendar.css';
import axios from 'axios';

class Principal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventsToSend: [],
      isAlertYNOpen: false,
      isAlertOKOpen: false,
      alertTitle: "Success",
      alertSubtitle: "Events sended successfully",
      sended: false,
      save: true
    }

  }
  openYNA = () => {
    this.openCloseAlertYN()
    console.log(this.state.eventsToSend);
  }
  openCloseAlertYN = (event) => {
    this.setState({
      isAlertYNOpen: !this.state.isAlertYNOpen
    });
  }
  sendInvitations = () => {
    
    this.setState({
      save: false
    })
    localStorage.removeItem('localEvents')
    //llamada a funcion de gustavo
    axios.post('http://10.16.0.104:1337/mail/', this.state.eventsToSend)
      .then(response => {
        console.log(response)
        //validamos response
        localStorage.removeItem('localEvents')
      })
      .catch(error => {
        localStorage.removeItem('localEvents')
        console.log(error);
      })
  

    //cerrar el alert actual
    this.openCloseAlertYN()
    //cambiamos los titulos
    this.setState({
      alertTitle: "Success",
      alertSubtitle: "Events was sent correctly"
    },
      () => this.openCloseAlertOK()
    );

  }
  openOKA = () => {
    this.openCloseAlertOK()
    console.log(this.state.eventsToSend);
  }
  openCloseAlertOK = (event) => {
      this.setState({
        sended: true,
        isAlertOKOpen: !this.state.isAlertOKOpen
      });
  }
  callbackFunction = (dataFromCalendar) => {
    this.setState({ eventsToSend: dataFromCalendar })
  }

  render() {
    return (
      <div>
        <Header />
        <AlertOK
          title={this.state.alertTitle}
          subtitle={this.state.alertSubtitle}
          show={this.state.isAlertOKOpen}
          continue={this.openCloseAlertOK}
        />
        <AlertYN
          title="Warning"
          subtitle="Do you want to send invitations now?"
          show={this.state.isAlertYNOpen}
          continue={this.sendInvitations}
          cancel={this.openCloseAlertYN}
        />
        <div className="body-canvas">
          <button disabled={this.state.sended} id="btnSendEvents" className="kd-button" eventsToSend={this.state.eventsToSend} onClick={this.openYNA}><img src={mailIcon} alt="Mail icon" /><p>SEND ALL EVENTS</p></button>
          <div className="principal-container">
            <KitchenCalendar save={this.state.save} parentCallback={this.callbackFunction} />
          </div>
        </div>
      </div>
    );
  }
}

export default Principal;