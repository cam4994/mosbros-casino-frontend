import React, { Component } from "react";
import Card from './Card';

class Dealer extends Component {

    render() {
        return (
            <div className="dealer">
                <div className="score">
                    {this.props.total}
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
