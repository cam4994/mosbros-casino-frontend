import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import '../Styling/stats.css'


const DEALERBUSTODDS = {
    '2': 35.30,
    '3': 37.56,
    '4': 40.28,
    '5': 42.89,
    '6': 42.08,
    '7': 25.99,
    '8': 23.86,
    '9': 23.34,
    '10': 21.43,
    'J': 21.43,
    'Q': 21.43,
    'K': 21.43,
    'A': 11.65
}

const BUSTCHANCE = {
    11: 0,
    12: 31,
    13: 39,
    14: 56,
    15: 58,
    16: 62,
    17: 69,
    18: 77,
    19: 85,
    20: 92,
    21: 100
}

export default class Stats extends Component {
    render() {
        console.log(this.props.userTotal, this.props.dealerCard.value)
        console.log(this.props.dealerCard.rank)
        let userTotal = this.props.userTotal
        let recommendation = ''
        if (userTotal <= 11) {
            userTotal = 11
            recommendation = 'Hit'
        } else if (userTotal >= 17) {
            recommendation = 'Stay'
        } else if (userTotal === 12) {
            if (this.props.dealerCard.rank >= 4 && this.props.dealerCard.rank <= 6) {
                recommendation = 'Stay'
            } else {
                recommendation = 'Hit'
            }
        } else {
            if (this.props.dealerCard.rank >= 7) {
                recommendation = 'Hit'
            } else {
                recommendation = 'Stay'
            }
        }


        

        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Dealer Bust %</th>
                            <th>Player Bust %</th>
                            <th>Recommendation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{`${DEALERBUSTODDS[this.props.dealerCard.value]}%`}</td>
                            <td>{`${BUSTCHANCE[userTotal]}%`}</td>
                            {recommendation === 'Hit' ? (
                            <td style={{color:'green'}}>{recommendation}</td>
                            ) : (
                                <td style={{color:'red'}}>{recommendation}</td>
                            )}
                        </tr>
                        {/* <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr> */}
                    </tbody>
                </Table>
            </div>
        )
    }
}