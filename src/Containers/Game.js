import React, { Component } from "react";
import Dealer from "../Components/Dealer";
import User from "../Components/User";
import Winner from "../Components/Winner";

export default class Game extends Component {

  state = {
    gameState: "",
    gameResult: "none",
    dealerCards: [],
    userCards: [],
    dealerTotal: 0,
    userTotal: 0,
    funds: 0,
  }
  componentDidMount() {
    /* start game on backend*/
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        move: "start",
        user: this.props.userId
      })
    }
    fetch(`http://localhost:3001/games/${this.props.gameId}`, configObj)
      .then(resp => resp.json())
      .then(turnResult => this.setState({
        gameState: turnResult.gameState,
        gameResult: turnResult.result
      }))

    /* Do initial fetch to get two user cards and two dealer cards */
    this.getInitialCards("users")
    setTimeout(()=>{
      this.getInitialCards("dealers")
    }, 2000)
    
  }
  stay = () => {
    /* begin dealer's turn */

  }

  /* callback function for dealer and user components */
  hit = (player) => {
    this.hitUpdate(player)
  }

  /* executes hit logic on backend and updates dealer/user cards with new card*/
  hitUpdate = (player) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        move: player + " hit"
      })
    }
    /* update cards and total for dealer or user after they hit*/
    fetch(`http://localhost:3001/games/${this.props.gameId}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        if (player === "dealer") {
          this.setState({
            dealerCards: data.cards,
            dealerTotal: data.player.score
          })
        } else {
          this.setState({
            userCards: data.cards,
            userTotal: data.player.score
          })
        }
      })
  }

    getInitialCards=(player)=>{
        let id=0
        if (player=== "users"){
          id=this.props.userId
        } else {
          id=this.props.gameId
        }
        console.log(id)
        console.log(player)
        fetch(`http://localhost:3001/${player}/${id}`)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          if (player === "users"){
            console.log('player score')
            console.log(data.player.score)
            this.setState({
              userCards: data.cards,
              userTotal: data.player.score
            })
          } else {
            console.log('dealer score')
            console.log(data.player.score)
            this.setState({
              dealerCards: data.cards,
              dealerTotal: data.player.score
            })
          }
        })
    }

  render() {
    return (
      <div className="game">
        <div className="game-container">
          <div className="dealer-container">
            <Dealer hit={this.hit} cards={this.state.dealerCards} total={this.state.dealerTotal} />
          </div>
          <div className="user-container">
            <User hit={this.hit} cards={this.state.userCards} stay={this.stay} total={this.state.userTotal} />
          </div>
        </div>
      </div>
    );
  }
}

