import React, { Component } from "react";
import Card from "./Card";
import '../Styling/buttons.scss'

class User extends Component {

    state={
        disable:false
    }


    // checkForSplit = () => {
    //     if (this.props.cards[0].value === this.props.cards[1].value && this.props.cards.length === 2) {
    //         return true
    //     } else {
    //         return false
    //     }

    // }

    handleClick=(move)=>{
        if (move==="hit"){
            this.props.userTurn(move)
        } else if (move==="double"){
            this.setState({disable:true})
            setTimeout(() => {
            this.props.userTurn(move)
            }, 400)
        } else if (move==="stay"){
            this.setState({disable:true})
            setTimeout(() => {
            this.props.dealerTurn()
            }, 400)
        } 

    }

    render() {
        return (
            <div className="user">
                <div className="user-top-container">
                <div className="user-score">
                    <span className="yellow" data-speed="4" data-color="#ff3">{this.props.total}</span>
                </div>
                    

                    <div className="cards">
                        <div className="playingCards">
                            <ul className="table">
                                {this.props.cards.map((card) => <Card key={card.id} card={card} />)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="user-bottom-container">
                    {this.state.disable===false ? <div className="fancybuttons">
                        <a href="#" onClick={()=> this.handleClick("hit")} className="red" data-speed="4" data-color="#f33">Hit</a>
                        <a href="#" onClick={()=> this.handleClick("stay")} className="green" data-speed="4" data-color="#3f3">Stay</a>
                        <a href="#" onClick={()=> this.handleClick("double")} className="blue" data-speed="4" data-color="#39f">Double</a>
                        {/* {this.props.split===true ? <a href="#" onClick={()=> this.handleClick("split")} className="blue" data-speed="4" data-color="#39f">Split</a> : null } */}
                    </div> : null}
                    
                </div>
            </div>
        );
    }
}

export default User;
