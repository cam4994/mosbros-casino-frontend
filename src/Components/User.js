import React, { Component } from "react";
import Card from "./Card";

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
                <div className="move">
                    {/* <button id="hit" onClick={() => this.props.hit("user")}>HIT</button> */}
                    {/* <button id="stay" className="far fa-hand-paper" onClick={this.props.stay}></button> */}
                    {/* <button id="double">DOUBLE</button> */}
                    {/* {this.checkForSplit() ? <button id="split">SPLIT</button> : null} */}
                </div>
            </div>
        );
    }
}

export default User;
