import React, { Component } from "react";
import '../Styling/card.css'

export default class Card extends Component {
  render() {
    let suit = this.props.card.suit
    if (suit === 'diamond') {
      suit = 'diams'
    } else {
      suit = suit + 's'
    }

    return (
      <li>{this.props.hide ? (
        <div className="card back">
        </div>
      ) : (
        <div className={`card rank-${this.props.card.value} ${suit}`}>
          <span className="rank">{this.props.card.value}</span>
          <span className="suit"></span>
          {/* <span className="suit">{suit === 'diams' ? '♦' : suit === 'clubs' ? '♣' : suit === 'spades' ? '♠' : suit === 'hearts' ? '♥' : null}</span> */}
        </div>
      )}
      </li>
      // <li>
      //   <div class="card back">
      //   </div>
      // </li>
    );
  }
}

