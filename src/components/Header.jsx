import React from 'react';
import ScioLogo from '../assets/images/scio.png'

class Header extends React.Component{
    render(){
        return (
            <div className="header">
                <img src={ScioLogo} alt="Company Logo" height="55"/>
                <p>Kitchen Duty</p>
            </div>
        );
    }
}

export default Header;