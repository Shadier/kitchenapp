import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment, { months } from 'moment'
import Modal  from './Modal';


const events = []
const localizer = momentLocalizer(moment) 

class KitchenCalendar extends React.Component {
    constructor(props){
        super(props)
        this.state = { events, isOpen : false}
    }

    toggleModal = (start) => {
        
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    
    handleSelect = ({ start, end }) => {
        var elementOfDay = String(start).split(" ");
        this.setState({
            modalTxt: "Insert e-mails of team for the day" ,
            modalDate: elementOfDay[1] +' '+ elementOfDay[2] +' '+ elementOfDay[3]
        });
        this.toggleModal(start)
        /*
        end = start
        const title = window.prompt('Correo')
        console.log(start)
        if (title)
        this.setState({
            events: [
            ...this.state.events,
            {
                start,
                end,
                title,
            },
            ],
        })
        
        console.log(this.state.events)*/
    }
    render(){
        return (
            <>
                <Modal morningEmail={this.props.morningEmail} afternoonEmail={this.props.afternoonEmail} title={this.state.modalTxt} subtitle={this.state.modalDate} show={this.state.isOpen} onClose={this.toggleModal}>
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