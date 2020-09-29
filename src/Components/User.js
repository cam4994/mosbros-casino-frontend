import React, { Component } from "react";
import Card from "./Components/Card";

class User extends Component {


    checkForSplit=()=>{
        if (this.props.cards[0].value==this.props.cards[1].value && this.props.cards.length==2){
            return true
        } else{
            return false
        }

    }

    render() {
        return (
            <div class="score">
                {this.props.total(this.props.cards)}
            </div>

            <div class="cards">
                {this.props.cards.map((card)=> <Card card={card}/>)}
            </div>

            <div class="move">
                <button id="hit" onClick={()=> this.props.hit("user")}>HIT</button>
                <button id="stay" onClick={this.props.stay}>STAY</button>
                <button id="double">DOUBLE</button>
                {this.checkForSplit() ? <button id="split">SPLIT</button> : null }
            </div>
    );
    }
}

export default User;
