import React, { Component } from "react";
import Card from './Card';

class Dealer extends Component {

    render() {
        return (
            <div className="dealer">
                <div className="score">
                    {this.props.total(this.props.cards)}
                </div>

                <div className="cards">
                    {this.props.cards.map((card) => <Card card={card} />)}
                </div>
            </div>
        );
    }
}

export default Dealer;
