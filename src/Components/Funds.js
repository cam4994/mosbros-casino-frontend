import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

class Funds extends Component {

    render() {
        return (
            
            <div className="funds">
                {this.props.gameOver===false ? <div> <div className="remainingFunds">
                    <span className="yellow" data-speed="4" data-color="#ff3">FUNDS: {this.props.funds}</span>
                </div>
                <div className="betTotal">
                    <span className="yellow" data-speed="4" data-color="#ff3">BET: {this.props.bet}</span>
                </div>
                <div className="fancybuttons">
                    <a href="#" onClick={() => this.props.addToBet(5)} className="red" data-speed="4" data-color="#f33">5</a>
                    <a href="#" onClick={() => this.props.addToBet(10)} className="green" data-speed="4" data-color="#3f3">10</a>
                    <a href="#" onClick={() => this.props.addToBet(25)} className="blue" data-speed="4" data-color="#39f">25</a>
                </div>
                
                <div className="otherButtons">
                    <a href="#" onClick={this.props.clearBet} className="blue" data-speed="4" data-color="#39f">Clear</a>
                    <a href="#" onClick={this.props.startGame} className="blue" data-speed="4" data-color="#39f">Bet</a>
                </div></div> : <NavLink to="/"> Home </NavLink>}
                </div>
                
           
        );
    }
}

export default Funds;
