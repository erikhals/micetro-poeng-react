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
          authed: true
        })
      }else{
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
    firebase.database().ref("state/players").on("value", snap =>{
      const pl = []

      snap.forEach(playersnap => {
        const player = playersnap.val()
        player.key = playersnap.key
        pl.push(player)
      })
      if(pl){
        this.setState(
        {players: pl,
        loading: false}
        )
      }

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
    const playerData = this.state.players
    const playerList = []
    for (let i = 0; i < playerData.length; i+=1){
      playerList.push(playerData[i].key)
    }
    const eventData = this.state.events
    const lastround = []
    for (let i = eventData.length-1; i >= 0; i -= 1){  // Go through events from end
      if(eventData[i].points === 0){
        break;
      }else{
        lastround.push(eventData[i])
      }
    }
    const played = [].concat(...lastround.map(event => event.players))
    const eliminations = eventData.filter(event => event.points === 0)
    const eliminated = [].concat(...eliminations.map(event => event.players))
    const roundplayers = playerList.filter(player =>  eliminated.indexOf(player) === -1)
    const bench = roundplayers.filter(player => played.indexOf(player) === -1)
    const benchData = [].concat(...bench.map(player => playerData.filter(data => data.key === player)))
    return (
      <App
        playerData={playerData}
        bench = {benchData}
        played = {played}
        eventData={eventData}
        authed={this.state.authed}
        loading={this.state.loading}
        eventNumber={eventNumber}
        />
    );
  }

}

export default AppContainer;