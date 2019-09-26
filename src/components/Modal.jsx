import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  handleUpdateMorning = (event) => {
    this.props.morningEmail = event.target.value;
    console.log( this.props.morningEmail)
  }
  handleUpdateAfternoon = (event) => {
    this.props.afternoonEmail = event.target.value;
    console.log( this.props.afternoonEmail)
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
          <input type="text" name="" id="" onChange={this.handleUpdateMorning}/>
          <label>Afternoon:</label>
          <input type="email" name="" id="" onChange={this.handleUpdateAfternoon}/>

          <div className="footer">
            <button className="kd-button-modal btn-cancel" onClick={this.props.onClose}>
              CANCEL
            </button>
            <button className="kd-button-modal" onClick={this.props.onClose}>
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