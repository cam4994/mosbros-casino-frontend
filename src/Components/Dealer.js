import React, { Component } from "react";
import Card from './Card';
import '../Styling/buttons.scss'


class Dealer extends Component {

    render() {
        return (
            <div className="dealer">
                <div className="dealer-score">
                    <span class="yellow" data-speed="4" data-color="#ff3">{this.props.total}</span>
                </div>

                <div className="cards">
                    <div className="playingCards">
                        <ul className="table">
                            {this.props.cards.map((card) => <Card key={card.id} card={card} />)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dealer;
