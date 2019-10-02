import React from 'react'
import '../assets/css/loading.css'
import loadingGif from '../assets/images/loading.gif'

class Loading extends React.Component {
    render(){
        if(!this.props.show)
            return false
        return (
            <div className="blackloading">
                <img src={loadingGif} alt="" width="80"/>
                <p>WAIT A MOMENT...</p>
            </div>
        )
    }
}

export default Loading;