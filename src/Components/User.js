import React, { Component } from "react";
import Card from "./Card";
import '../Styling/buttons.scss'

class User extends Component {


    // checkForSplit = () => {
    //     if (this.props.cards[0].value === this.props.cards[1].value && this.props.cards.length === 2) {
    //         return true
    //     } else {
    //         return false
    //     }

    // }

    render() {
        return (
            <div className="user">
                <div className="user-top-container">
                <div className="user-score">
                    <span className="yellow" data-speed="4" data-color="#ff3">{this.props.total}</span>
                </div>
                    

                    <div className="cards">
                        <div className="playingCards">
                            <ul className="table">
                                {this.props.cards.map((card) => <Card key={card.id} card={card} />)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="user-bottom-container">
                    {/* <button id="hit" onClick={() => this.props.hit("user")}>HIT</button>
                    <button id="stay" className="far fa-hand-paper" onClick={this.props.dealerTurn}></button>
                    <button id="double">DOUBLE</button> */}
                    {/* {this.checkForSplit() ? <button id="split">SPLIT</button> : null} */}
                    <div className="fancybuttons">
                        <a href="#" onClick={this.props.userTurn} className="red" data-speed="4" data-color="#f33">Hit</a>
                        <a href="#" onClick={this.props.dealerTurn} className="green" data-speed="4" data-color="#3f3">Stay</a>
                        <a href="#" className="blue" data-speed="4" data-color="#39f">Double</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
