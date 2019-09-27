import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
  handleOk = (event) => {
    this.props.continue()
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
          <div className="footer">
            <button type="submit" className="kd-button-modal" onClick={this.handleOk}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  continue: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Alert;