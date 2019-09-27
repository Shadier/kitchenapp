import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment, { months } from 'moment'
import Modal  from './Modal'
import '../App.css';


const events = []
const localizer = momentLocalizer(moment) 

class KitchenCalendar extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            date: '',
            dateMorningStart: '',
            dateMorningEnd: '',
            dateAfternoonStart: '',
            dateAfternoonEnd: '',
            events, 
            onClose : false,
            onCancel : false,
            isOpen : false,
            usrMorning : '',
            usrAfternoon : '',
            eventsToSend : []
        }
    }
    
    closeModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleModal = () => {
        const bandera = !this.state.isOpen
        this.setState({
          isOpen: !this.state.isOpen
        });
        if(!bandera){
            this.setState({
                events: [
                ...this.state.events,
                {  start: this.state.date,
                   end: this.state.date,
                   title: this.state.usrMorning,
                },
                {  start: this.state.date,
                   end: this.state.date,
                   title: this.state.usrAfternoon } ],
                
                eventsToSend: [
                    ...this.state.eventsToSend,
                    {  dateMorningStart: this.state.dateMorningStart, dateMorningEnd: this.state.dateMorningEnd, title: this.state.usrMorning + "@sciodev.com"  },
                    {  dateAfternoonStart: this.state.dateAfternoonStart, dateAfternoonEnd: this.state.dateAfternoonEnd, title: this.state.usrAfternoon + "@sciodev.com"  } ],
            },
            function() { console.log("setState completed", this.props.parentCallback(this.state.eventsToSend))}
            )
        }
    }

    onMorningChange = (event) =>{
        this.setState({usrMorning: event.target.value})
    }
    onAfternoonChange = (event) =>{
        this.setState({usrAfternoon: event.target.value})
    }
    
    
    handleSelect = ({ start, end }) => {

        const timeOffset = new Date().getTimezoneOffset() / 60
        let newDate = new Date(start.setHours(10 - timeOffset))
        const dateMorningStart = new Date(newDate).toISOString()
        const dateMorningEnd = new Date(newDate.setMinutes(15)).toISOString()
        newDate = new Date(newDate.setHours(16 - timeOffset))
        const dateAfternoonStart = new Date(newDate.setMinutes(0)).toISOString()
        const dateAfternoonEnd = new Date(newDate.setMinutes(15)).toISOString()
        var elementOfDay = String(start).split(" ");
        this.setState({
            modalTxt: "Insert e-mails of team for the day" ,
            modalDate: elementOfDay[1] +' '+ elementOfDay[2] +' '+ elementOfDay[3],
            date: end, 
            dateMorningStart,
            dateMorningEnd,
            dateAfternoonStart,
            dateAfternoonEnd
        });
        this.toggleModal()
    }
    render(){
        return (
            <>
                <Modal 
                    onAfternoonChange={this.onAfternoonChange}
                    onMorningChange={this.onMorningChange}
                    title={this.state.modalTxt} 
                    subtitle={this.state.modalDate} 
                    show={this.state.isOpen} 
                    onClose={this.toggleModal} 
                    onCancel={this.closeModal}
                />
                <Calendar
                    selectable
                    views={months}
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectSlot={this.handleSelect}
                />
            </>
        )
    }
}


export default KitchenCalendar