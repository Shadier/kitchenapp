import React from 'react';
import KitchenCalendar from './KitchenCalendar';
import Header from './Header';
import AlertOK from './AlertOK';
import AlertYN from './AlertYN';
import mailIcon from '../assets/images/email-send.png'
import '../assets/css/calendar.css';

class Principal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventsToSend: [],
      isAlertYNOpen: false,
      isAlertOKOpen: false,
      alertTitle: "Success",
      alertSubtitle: "Events sended successfully",
      sended: false
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
    //llamada a funcion de gustavo

    //recibimos la respuesta

    //cerrar el alert actual
    this.openCloseAlertYN()
    //cambiamos los titulos
    this.setState({
      alertTitle: "SUCCESS/ERROR",
      alertSubtitle: "ALERT BODY"
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
            <KitchenCalendar parentCallback={this.callbackFunction} />
          </div>
        </div>
      </div>
    );
  }
}

export default Principal;