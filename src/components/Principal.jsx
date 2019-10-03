import React from 'react';
import KitchenCalendar from './KitchenCalendar';
import Header from './Header';
import AlertOK from './AlertOK';
import AlertYN from './AlertYN';
import Loading from './LoadingComponent';
import mailIcon from '../assets/images/email-send.png'
import '../assets/css/calendar.css'
import axios from 'axios'

class Principal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      events: (JSON.parse(localStorage.getItem('localEvents')))? JSON.parse(localStorage.getItem('localEvents')) : [],
      alertYNShow: false,
      alertOKShow: false,
      alertTitle: "Success",
      alertSubtitle: "Events sended successfully",
      sended: false,
      save: true,
      loading: false
    }

  }
  openYNA = () => {
    if(!this.state.events)
      return false
    this.openCloseAlertYN()
    console.log(this.state.events);
  }
  openCloseAlertYN = (event) => {
    this.setState({
      alertYNShow: !this.state.alertYNShow
    });
  }
  sendInvitations = () => {
    
    this.openCloseAlertYN()
    this.setState({
      loading: true
    })
    //llamada a funcion de gustavo
    axios.post('http://10.16.0.104:1337/mail/', this.state.events)
      .then(response => {
        console.log("sended"+response)
        
        localStorage.removeItem('localEvents')
        this.setState({
          alertTitle: "Success",
          alertSubtitle: "Events were sent correctly!"
        },
          () => {
            this.openCloseAlertOK()} //we wait until state changes
        );
      })
      .catch(error => {
        this.setState({
          alertTitle: "Whoops",
          alertSubtitle: "Events weren't sent correctly or server was not found. Please make sure you have access to the internet and that you correctly input the kitchen duty assignments."
        },
          () => {this.openCloseAlertOK(); this.setState({loading: false, save: true})} //we wait until state changes
        );
        console.log(error + "axios");
      })


    

  }
  openOKA = () => {
    this.openCloseAlertOK()
    console.log(this.state.events);
  }
  openCloseAlertOK = (event) => {
    this.setState({
      loading: false, 
      save: false, 
      sended: true,
      alertOKShow: !this.state.alertOKShow
    });
  }
  callbackFunction = (dataFromCalendar) => {
    this.setState({ events: dataFromCalendar })
  }

  render() {
    return (
      <div>
        <Loading show={this.state.loading}/>
        <Header />
        <AlertOK
          title={this.state.alertTitle}
          subtitle={this.state.alertSubtitle}
          show={this.state.alertOKShow}
          continue={this.openCloseAlertOK}
        />
        <AlertYN
          title="Warning"
          subtitle="Do you want to send invitations now?"
          show={this.state.alertYNShow}
          continue={this.sendInvitations}
          cancel={this.openCloseAlertYN}
        />
        <div className="body-canvas">
          <button disabled={this.state.sended} id="btnSendEvents" className="kd-button" events={this.state.events} onClick={this.openYNA}><img src={mailIcon} alt="Mail icon" /><p>SEND ALL EVENTS</p></button>
          <div className="principal-container">
            <KitchenCalendar save={this.state.save} parentCallback={this.callbackFunction} />
          </div>
        </div>
      </div>
    );
  }
}

export default Principal;