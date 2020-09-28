import React, { Component } from "react";
import Card from "./Components/Card";

class User extends Component {
    render() {
        return (
            <div class="score">

            </div>

            <div class="cards">
                {this.props.cards.map((card)=> <Card card={card}/>)}
            </div>
    );
    }
}

export default User;
