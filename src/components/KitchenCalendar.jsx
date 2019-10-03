import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment, { months } from 'moment'
import Modal  from './Modal'
import '../App.css';

const events = (JSON.parse(localStorage.getItem('localEvents')))? JSON.parse(localStorage.getItem('localEvents')) : []
const localizer = momentLocalizer(moment) 

class KitchenCalendar extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            date: '',
            events, 
            onClose : false,
            onCancel : false,
            isOpen : false,
            isAlertOpen : false,
            usrMorning : '',
            usrAfternoon : ''
        }
    }
    
    closeModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    toggleModal = () => {
        const bandera = !this.state.isOpen
        if(!bandera && (this.state.usrMorning != '') && (this.state.usrAfternoon != '')){
            this.setState({
                events: [
                ...this.state.events,
                {  
                    start: this.state.date,
                    end: this.state.date,
                    title: this.state.usrMorning,
                    shiftam: true
                },
                {  
                    start: this.state.date,
                    end: this.state.date,
                    title: this.state.usrAfternoon, 
                    shiftam: false
                } ],
                usrMorning: '',
                usrAfternoon: '',
            },
            () => { this.saveTemporalEvents() }
            )
        }
        this.setState({ isOpen: !this.state.isOpen, usrMorning: '', usrAfternoon: ''});
    }
    saveTemporalEvents = () => {
        this.props.parentCallback(this.state.events)
        localStorage.setItem('localEvents', JSON.stringify(this.state.events))
    }
    onMorningChange = (event) =>{
        const usrMorning = escape(event.target.value.replace(/ /g, ""))
        this.setState({usrMorning})
    }
    onAfternoonChange = (event) =>{
        const usrAfternoon = escape(event.target.value.replace(/ /g, ""))
        this.setState({usrAfternoon})
    }
    
    handleSelect = ({ start, end }) => {
        if(!this.props.save)
            return
        var elementOfDay = String(start).split(" ");
        let temporaryDates = [];
        this.state.events.forEach(event => {
            console.log(new Date(start).getTime())
            console.log(new Date(event.start).getTime())
            if(new Date(start).getTime() != new Date(event.start).getTime())
            temporaryDates.push(event)
        });
        this.setState({
            modalTxt: "Input the team's e-mails" ,
            modalDate: elementOfDay[1] +' '+ elementOfDay[2] +' '+ elementOfDay[3],
            date: end, 
            events : temporaryDates,
        });
        this.saveTemporalEvents()
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