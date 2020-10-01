import React, { Component } from "react";

class Funds extends Component {

    render() {
        return (
            <div className="fancybuttons">
            <a href="#" onClick={()=> this.props.bet("5")} className="red" data-speed="4" data-color="#f33">5</a>
            <a href="#" onClick={()=> this.props.bet("10")} className="green" data-speed="4" data-color="#3f3">10</a>
            <a href="#" onClick={()=> this.props.bet("25")} className="blue" data-speed="4" data-color="#39f">25</a>
            </div>
    );
    }
}

export default Funds;
