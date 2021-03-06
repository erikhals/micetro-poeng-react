import React, { Component } from 'react'
import * as firebase from 'firebase'

import App from './App'

class AppContainer extends Component {

  state = {
      players: [],
      events: [],
      playerPoints: [],
      email: "erik@xvision.no",
      authed: false,
      loading: true,
      sideDrawerOpen: false
    }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({
          authed: true
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
    firebase.database().ref("state/players").on("value", snap => {
      const pl = []

      snap.forEach(playersnap => {
        const player = playersnap.val()
        player.key = playersnap.key
        pl.push(player)
      })
      if (pl) {
        this.setState({
            players: pl,
            loading: false
          }
        )
      }
    })
    firebase.database().ref("state/events").on("value", snap => {
      const ev = []
      const pPoints = []
      snap.forEach((evsnap) => {
        const item = evsnap.val()
        item.key = evsnap.key
        ev.push(item)

        // Add points to players
        if (item.players) {
          for (let i = 0; i < item.players.length; i += 1) {
            const plkey = pPoints.filter(pl => pl.key === item.players[i])
            if (plkey.length < 1) {       // if no matching player
              const player = { 
                key: item.players[i], 
                points: Number(item.points) 
              }
              pPoints.push(player)
            } else {
              plkey[0].points += item.points
            }
          }
        }
      })

      pPoints.sort((a, b) => b.points - a.points)

      if (ev) {
        this.setState(
          {
            events: ev,
            playerPoints: pPoints
          }
        )
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  render() {
    const playerData = this.state.players
    const playerPoints = this.state.playerPoints
    const playerList = []
    for (let i = 0; i < playerData.length; i += 1) {
      playerList.push(playerData[i].key)
    }
    const eventData = this.state.events
    const lastround = []
    for (let i = eventData.length - 1; i >= 0; i -= 1) {  // Go through events from end
      if (eventData[i].points === 0) {
        break;
      } else {
        lastround.push(eventData[i])
      }
    }
    
    const played = lastround.flatMap(event => event.players)
    const eliminations = eventData.filter(event => event.points === 0)
    const eliminated = eliminations.flatMap(event => event.players)
    const roundplayers = playerList.filter(player => eliminated.indexOf(player) < 0)
    const bench = roundplayers.filter(player => played.indexOf(player) < 0)
    const benchData = bench.flatMap(player => playerData.filter(data => data.key === player))
    const playedData = played.map(player => {
      const nName = playerData.find(nm => nm.key === player)
      const nPoints = playerPoints.find(pts => pts.key === player)
      return { "key": player, "points": nPoints.points, "name": nName.name, "number": nName.number }
    }).sort((a, b) => b.points - a.points)
    const sceneNumber = this.state.events.length + 1 - eliminations.length
    const roundNumber = eliminations ? eliminations.length + 1 : 1

    return (
      <App
        playerData={playerData}
        playerPoints={this.state.playerPoints}
        bench={benchData}
        played={playedData}
        eventData={eventData}
        authed={this.state.authed}
        loading={this.state.loading}
        eventNumber={sceneNumber}
        roundNumber={roundNumber}
        sideDrawerOpen={this.state.sideDrawerOpen}
        drawerClickHandler={this.drawerToggleClickHandler}
        backdropClickHandler={this.backdropClickHandler}
      />
    );
  }

}

export default AppContainer
