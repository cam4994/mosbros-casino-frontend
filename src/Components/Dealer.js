import React, { Component } from "react";

class Dealer extends Component {

    render() {
        return (
            <div class="score">
                {this.props.total(this.props.cards)}
            </div>

            <div class="cards">
                {this.props.cards.map((card)=> <Card card={card}/>)}
            </div>
    );
    }
}

export default Dealer;
