import React, { Component } from "react";
import Card from './Card';
import '../Styling/buttons.scss'


class Dealer extends Component {

    render() {
        return (
            <div className="dealer">
                {this.props.showDealerScore===false ? null : 
                <div className="dealer-score">
                    <span className="yellow" data-speed="4" data-color="#ff3">{this.props.total}</span>
                </div>}
                

                <div className="cards">
                    <div className="playingCards">
                        <ul className="table">
                            {this.props.cards.map((card) => <Card key={card.id} card={card} hide={this.props.showDealerScore===true ? false : 
                            card.hide ? true : null }/>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dealer;
