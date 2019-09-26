import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" >
        <div className="modal">
          <p>{this.props.children}</p>
          <p>{this.props.children}</p>
          <label>Morning:</label>
          <input type="text" name="" id=""/>
          <label>Afternoon:</label>
          <input type="email" name="" id=""/>

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