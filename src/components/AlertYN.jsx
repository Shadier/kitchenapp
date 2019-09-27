import React from 'react';
import PropTypes from 'prop-types';

class AlertYN extends React.Component {
    handleYes = (event) => {
        this.props.continue()
    }
    handleNo = (event) => {
        this.props.cancel()
    }

    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop" >
                <div className="modal">
                    <p className="title">{this.props.title}</p>
                    <p className="subtitle">{this.props.subtitle}</p>
                    <div className="footer">
                        <button type="submit" className="kd-button-modal btn-cancel" onClick={this.handleNo}>
                            CANCEL
                        </button>
                        <button type="submit" className="kd-button-modal" onClick={this.handleYes}>
                            YES, SEND IT
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

AlertYN.propTypes = {
    continue: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default AlertYN;