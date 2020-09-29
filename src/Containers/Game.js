import React, { Component } from "react";
import Dealer from "../Components/Dealer";
import User from "../Components/User";
import Winner from "../Components/Winner";

class Game extends Component {
  
    state={
        gameState="",
        gameResult="none",
        dealerCards=[],
        userCards=[],
        funds=0,
    }

    total=(cards)=>{
      let sum=0;
      cards.forEach((card)=> sum+=card.rank)
      return sum
  }

  stay=()=>{
    /* begin dealer's turn */

  }

    /* callback function for dealer and user components */
    hit=(player)=>{
      this.hitUpdate(player)
    }

    /* executes hit logic on backend and updates dealer/user cards with new card*/
    hitUpdate=(player)=>{
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          move: player+" hit"
        })
      }
      fetch(`http://localhost:3001/games/${this.props.gameId}`, configObj)
        .then(resp => resp.json())
        .then(cards => {
          if (cards[0].owner_type == "Dealer"){
            this.setState({
              dealerCards: cards
            })
          } else {
            this.setState({
              userCards: cards
            })
          }
        })
    }

    getCards=(player)=>{
      
        fetch(`http://localhost:3001/${player}/${this.props.userId}`)
        .then(resp => resp.json())
        .then(cards => {
          if (player == "users"){
            this.setState({
              userCards: cards
            })
          } else {
            this.setState({
              dealerCards: cards
            })
          }
        })
          
      
      
    }

    componentDidMount(){
      /* start game on backend*/
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          move: "start"
        })
      }
      fetch(`http://localhost:3001/games/${this.props.gameId}`, configObj)
        .then(resp => resp.json())
        .then(turnResult => this.setState({
          gameState: turnResult.gameState,
          gameResult: turnResult.result
        }))

      /* Do initial fetch to get two user cards and two dealer cards */
      this.getCards("users")
      this.getCards("dealers")
    }


  render() {
    return (
      <div >
        <Dealer hit={this.hit} cards={this.state.dealerCards}/>
        <User hit={this.hit} cards={this.state.userCards} stay={this.stay}/>

      </div>
    );
  }
}

export default Game;
