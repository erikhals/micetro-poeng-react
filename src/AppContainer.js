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
    db.on("value", snap =>{
      const pl = snap.child("players").val()
      const ev = []
      snap.child("events").forEach((evsnap)=>{
        const item = evsnap.val()
        item.key = evsnap.key
        ev.push(item)
      })
      if(pl){this.setState(
        {players: pl}
      )}
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
