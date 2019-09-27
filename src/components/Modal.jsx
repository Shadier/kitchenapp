import React from 'react';
import PropTypes from 'prop-types';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

class Modal extends React.Component {
  constructor(props){
    super(props)
        this.state = { 
            nameRg : ''
        }
  }
  handleUpdateMorning = (event) => {
    
    this.props.morningEmail = event.target.value;
    console.log( this.props.morningEmail)
  }
  handleUpdateAfternoon = (event) => {
    
    this.props.afternoonEmail = event.target.value;
    console.log( this.props.afternoonEmail)
  }


  prueba = (event) => {
    console.log(this.state.name)
    this.props.onClose()
  }


  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" >
        <div className="modal">
          <p className="title">{this.props.title}</p>
          <p className="subtitle">{this.props.subtitle}</p>
          <label>Morning:</label>
          <Textbox
          className="input"
            value={this.state.nameRg} 
            onChange={(name, e) => {
              this.setState({ name });
            }} 
            onBlur={this.props.onMorningChange} 
            validationOption={{
              
            }}
          />
          
          <div className="emailIndicator1">
            @sciodev.com
          </div>
          <label>Afternoon:</label>

          <Textbox
            id={'Name'} 
            name="Name" 
            type="text" 
            value={this.state.nameRg} 
            placeholder="Place your name here ^-^" 
            onChange={(name, e) => {
              this.setState({ nameRg: '' });
            }} 
            onBlur={this.props.onAfternoonChange} 
            validationOption={{
              
            }}
          />
          <div className="emailIndicator2">
            @sciodev.com
          </div>

          <div className="footer">
            <button className="kd-button-modal btn-cancel" onClick={this.props.onCancel}>
              CANCEL
            </button>
            <button type="submit" className="kd-button-modal" onClick={this.props.onClose}>
              ASSIGN
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;