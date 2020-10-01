import React from 'react';
import '../Styling/blackjackmodal.css'

const BlackJackModal = (props) => {
    return (
        <div className = "Modal">
            {props.children}
        </div>
    );
};


export default BlackJackModal;