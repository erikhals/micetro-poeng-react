import React, { Component } from 'react'
import * as firebase from 'firebase'

import App from './App'

class AppContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      players: [],
      events: [],
      email: "erik@xvision.no",
      authed: false,
      loading: true
    }
  }

  componentWillMount(){
    this.removeListener = firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        this.setState({
          authed: true,
          loading: false
        })
      }else{
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount(){
    this.removeListener()
  }



  render() {
    const eventNumber = this.state.events.length + 1
    return (
      <App
        players={this.state.players}
        events={this.state.events}
        authed={this.state.authed}
        loading={this.state.loading}
        eventNumber={eventNumber}
        />
    );
  }

}

export default AppContainer;
