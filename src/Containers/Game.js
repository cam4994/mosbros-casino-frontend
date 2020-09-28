import React, { Component } from "react";
import Dealer from "../Components/Dealer";
import User from "../Components/User";

class Game extends Component {
  
    state={
        dealerCards=[],
        userCards=[],
        deck=[],
        funds=0,
    }

    total=(cards)=>{
      let sum=0;
      cards.forEach((card)=> sum+=card.trueValue)
      return sum
  }

    hit=(player)=>{
      if (player == "user"){

      }
    }

    componentDidMount(){
      
    }


  render() {
    return (
      <div >
        
      </div>
    );
  }
}

export default Game;
