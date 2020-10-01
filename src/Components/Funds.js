import React, { Component } from "react";

class Funds extends Component {

    render() {
        return (
            <div>
                <div className="betTotal">
                    <span className="yellow" data-speed="4" data-color="#ff3">{this.props.bet}</span>
                </div>
                <div className="fancybuttons">
                    <a href="#" onClick={() => this.props.bet(5)} className="red" data-speed="4" data-color="#f33">5</a>
                    <a href="#" onClick={() => this.props.bet(10)} className="green" data-speed="4" data-color="#3f3">10</a>
                    <a href="#" onClick={() => this.props.bet(25)} className="blue" data-speed="4" data-color="#39f">25</a>
                    <a href="#" onClick={this.props.clearBet} className="blue" data-speed="4" data-color="#39f">Clear</a>
                    <a href="#" onClick={this.props.startGame} className="blue" data-speed="4" data-color="#39f">Bet</a>
                </div>
            </div>
        );
    }
}

export default Funds;
