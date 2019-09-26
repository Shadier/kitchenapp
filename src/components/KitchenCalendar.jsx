import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment, { months } from 'moment'
import Modal  from './Modal';

const events = []
const eventsToSend = []
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
            usrMorning : '',
            usrAfternoon : ''
        }
    }
    
    closeModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleModal = () => {
        const date = this.state.date
        const bandera = !this.state.isOpen
        this.setState({
          isOpen: !this.state.isOpen
        });
        if(!bandera){
            console.log("entro")
            const usrMorning234 =  this.state.usrMorning + "@sciodev.com"
            const usrAfternoon234 =  this.state.usrAfternoon + "@sciodev.com"
            console.log(this.state.usrAfternoon)
            this.setState({
                events: [
                ...this.state.events,
                {
                    start: date,
                    end: date,
                    title: usrMorning234,
                },
                {
                    start: date,
                    end: date,
                    title: usrAfternoon234,
                },
                ],
            })
            console.log(this.state.events)
        }
    }

    onMorningChange = (event) =>{
        this.setState({usrMorning: event.target.value})
    }
    onAfternoonChange = (event) =>{
        this.setState({usrAfternoon: event.target.value})
    }
    
    
    handleSelect = ({ start, end }) => {
        console.log(start)
        const timeOffset = new Date().getTimezoneOffset() / 60
        const newD = new Date(start.setHours(1 - timeOffset)).toISOString()
        console.log(timeOffset)


        
        var elementOfDay = String(start).split(" ");
        this.setState({
            modalTxt: "Insert e-mails of team for the day" ,
            modalDate: elementOfDay[1] +' '+ elementOfDay[2] +' '+ elementOfDay[3],
            date: start
        });
        this.toggleModal()
    }
    render(){
        return (
            <>
                <Modal onAfternoonChange={this.onAfternoonChange} onMorningChange={this.onMorningChange} title={this.state.modalTxt} subtitle={this.state.modalDate} show={this.state.isOpen} onClose={this.toggleModal} onCancel={this.closeModal}>
                </Modal>
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