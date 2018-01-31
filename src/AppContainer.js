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
    const db = firebase.database().ref("state")
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
    firebase.database().ref("state/players").on("value", snap =>{
      const pl = snap.val()

      if(pl){this.setState(
        {players: pl}
      )}

    })
    firebase.database().ref("state/events").on("value", snap =>{
      const ev = []

      snap.forEach((evsnap)=>{
        const item = evsnap.val()
        item.key = evsnap.key
        ev.push(item)
      })

      if(ev){this.setState(
        {events: ev}
      )}

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
        playersSort={this.playersSort}
        />
    );
  }

}

export default AppContainer;
